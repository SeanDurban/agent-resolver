const fs = require('fs');
const async = require('async');
const printAgent = require('./agents/printAgent');
const httpRequestAgent = require('./agents/httpRequestAgent');
const triggerAgent = require('./agents/triggerAgent');
const config = require('./config.json');

function jsonFileParser(path) {
  let json = {};
  try {
    json = JSON.parse(fs.readFileSync(path));
  } catch (error) {
    console.error('Invalid JSON input');
    process.exit();
  }
  return json;
}

function validSource(sourceAgentName, events) {
  if (events[sourceAgentName] && events[sourceAgentName] === true) return true;
  return false;
}

async function resolveAgents(agents) {
  if (!agents || agents.length === 0) {
    console.error('Invalid agents');
  }
  const events = {};
  // Ensures agents are executed sequentially
  await async.eachSeries(agents, async (agent) => {
    if (!agent.source || validSource(agent.source, events)) {
      if (agent.type === config.HTTPRequestAgentName) {
        await httpRequestAgent.resolve(agent, events);
      } else if (agent.type === config.PrintAgentName) {
        await printAgent.resolve(agent, events);
      } else if (agent.type === config.TriggerAgentName) {
        await triggerAgent.resolve(agent, events);
      } else {
        console.error(`Unsupported agent type : ${agent.type}`);
      }
    }
  }).catch((err) => console.log(`error caught in this story${err}`));
}

module.exports = { jsonFileParser, resolveAgents };
