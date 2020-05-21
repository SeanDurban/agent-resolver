const utils = require('./utils');

async function resolve(printAgentDetails, data) {
    if(validParameters(printAgentDetails)) {
        let output = utils.interpolateString(printAgentDetails.options.message, data);
        console.log(output);
    }
    else {
        console.error("Invalid PrintAgent format");
    }
}

function validParameters(printAgentDetails) {
    if(printAgentDetails && printAgentDetails.options && printAgentDetails.options.message 
        && typeof printAgentDetails.options.message == "string") {
            return true;
    }
    
    return false;

}

module.exports = {resolve};