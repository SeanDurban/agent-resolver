const utils = require('./utils');

function resolve(printAgentDetails, data) {
    if(printAgentDetails.options.message) {
        let output = utils.interpolateString(printAgentDetails.options.message, data);
        console.log(output);
    }
    else {
        console.log("Invalid PrintAgent format");
    }
}

module.exports = {resolve};