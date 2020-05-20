const utils = require('./utils');

function resolve(httpRequestAgent, events) {
    // type, name, options.url
    if(httpRequestAgent.options.url){
        const url = utils.interpolateString(httpRequestAgent.options.url, events);
        //make http request

        //Set events to result
        let requestResult = {}
        events[httpRequestAgent.name] = requestResult;
    }
}

module.exports = {resolve};