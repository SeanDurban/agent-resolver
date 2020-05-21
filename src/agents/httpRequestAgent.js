const utils = require('./utils');
const axios = require('axios');

async function resolve(httpRequestAgent, events) {
    if(httpRequestAgent.options.url){
        const url = utils.interpolateString(httpRequestAgent.options.url, events);

        let response = await axios.get(url);
        events[httpRequestAgent.name] = response.data;
    }
    else {
        console.error("Invalid HttpAgent format");
    }
}

module.exports = {resolve};