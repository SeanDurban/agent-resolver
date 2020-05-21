const utils = require('./utils');

async function resolve(printAgentDetails, data) {
    if(printAgentDetails.options.message && typeof printAgentDetails.options.message == "string") {
        let output = utils.interpolateString(printAgentDetails.options.message, data);
        console.log(output);
    }
    else {
        console.error("Invalid PrintAgent format");
    }
}

module.exports = {resolve};