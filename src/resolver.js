const fs = require('fs');
const async = require('async');
const printAgent = require('./agents/printAgent');
const httpRequestAgent = require('./agents/httpRequestAgent');
const httpReqAgentType = 'HTTPRequestAgent';
const printAgentType = 'PrintAgent';

function jsonArgParser(path) {
    try {
        return JSON.parse(fs.readFileSync(path));
    }
    catch(error) {
        console.error("Invalid JSON input");
        process.exit();
    }
}

async function resolveAgents(agents) {
    let events = {};
    // Ensures agents are executed sequentially
    async.eachSeries(agents, async (agent) => {
        if(agent.type === httpReqAgentType) {
            await httpRequestAgent.resolve(agent, events);
        }
        else if (agent.type === printAgentType) {
            await printAgent.resolve(agent, events);
        }
        else {
            console.error("Unsupported agent type : " + agent.type);
        }
    });
}

// example usage 'node resolver.js /path/to/jsonfile.json'
let agents = jsonArgParser(process.argv[2]).agents;
resolveAgents(agents);