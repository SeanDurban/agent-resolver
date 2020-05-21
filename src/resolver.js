const fs = require('fs');
const async = require('async');
const printAgent = require('./agents/printAgent');
const httpRequestAgent = require('./agents/httpRequestAgent');
const httpReqAgentType = 'HTTPRequestAgent';
const printAgentType = 'PrintAgent';

// example 'node resolver.js /path/to/jsonfile.json'
function jsonArgParser() {
    //argv[2] is path to json file
    try {
        return JSON.parse(fs.readFileSync(process.argv[2]));
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

let agents = jsonArgParser().agents;
resolveAgents(agents);