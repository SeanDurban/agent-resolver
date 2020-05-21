const utils = require('./utils');
const axios = require('axios');

async function resolve(httpRequestAgent, events) {
    if(validParameters(httpRequestAgent)) {
        const url = utils.interpolateString(httpRequestAgent.options.url, events);

        try {
            let response = await axios.get(url);
            events[httpRequestAgent.name] = response.data;
        }
        catch(error) {
            let agentName = httpRequestAgent.name ? httpRequestAgent.name : "";
            console.error("HttpRequestAgent (" + agentName + ") failed");
            console.error(error);
            process.exit();
        }
    }
    else {
        console.error("Invalid HttpAgent format");
    }
}

function validParameters(httpRequestAgent) {
    if(httpRequestAgent && httpRequestAgent.options && httpRequestAgent.options.url && typeof httpRequestAgent.options.url == "string") {
        return true;
    }
    return false;
} 

module.exports = {resolve};