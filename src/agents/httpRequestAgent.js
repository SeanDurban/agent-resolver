const utils = require('./utils');
const axios = require('axios');

async function resolve(httpRequestAgent, events) {
    if(httpRequestAgent.options.url && typeof httpRequestAgent.options.url == "string"){
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

module.exports = {resolve};