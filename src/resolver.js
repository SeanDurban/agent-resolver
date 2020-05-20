const fs = require('fs');
const httpReqAgentType = 'HTTPRequestAgent';
const printAgentType = 'PrintAgent';

// example 'node resolver.js /path/to/jsonfile.json'
function jsonArgParser() {
    //argv[2] is path to json file
    return JSON.parse(fs.readFileSync(process.argv[2]));
}

function resolveAgents(agents) {
    agents.forEach((agent) => {
        if(agent.type === httpReqAgentType) {
            console.log("http agent");
        }
        else if (agent.type === printAgentType) {
            console.log("print agent");
        }
        else {
            console.log("Unsupported type : " + agent.type);
        }
    });
}

let agents = jsonArgParser().agents;
resolveAgents(agents);