const fs = require('fs');
const printAgent = require('./agents/printAgent');
const httpReqAgentType = 'HTTPRequestAgent';
const printAgentType = 'PrintAgent';

// example 'node resolver.js /path/to/jsonfile.json'
function jsonArgParser() {
    //argv[2] is path to json file
    return JSON.parse(fs.readFileSync(process.argv[2]));
}

function resolveAgents(agents) {
    let events = {};

    agents.forEach((agent) => {
        if(agent.type === httpReqAgentType) {
            console.log("http agent");
        }
        else if (agent.type === printAgentType) {
            printAgent.resolve(agent, events);
        }
        else {
            console.log("Unsupported type : " + agent.type);
        }
    });
}

let agents = jsonArgParser().agents;
resolveAgents(agents);