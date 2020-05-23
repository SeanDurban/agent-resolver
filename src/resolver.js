const fs = require('fs');
const async = require('async');
const printAgent = require('./agents/printAgent');
const httpRequestAgent = require('./agents/httpRequestAgent');

const httpReqAgentType = 'HTTPRequestAgent';
const printAgentType = 'PrintAgent';

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

async function resolveAgents(agents) {
  if (!agents || agents.length === 0) {
    console.error('Invalid agents');
  }
  const events = {};
  // Ensures agents are executed sequentially
  await async.eachSeries(agents, async (agent) => {
    if (agent.type === httpReqAgentType) {
      await httpRequestAgent.resolve(agent, events);
    } else if (agent.type === printAgentType) {
      await printAgent.resolve(agent, events);
    } else {
      console.error(`Unsupported agent type : ${agent.type}`);
    }
  });
}

module.exports = { jsonFileParser, resolveAgents };
