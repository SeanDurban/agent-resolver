/* eslint-disable no-param-reassign */
const axios = require('axios');
const utils = require('./utils');

function validParameters(httpRequestAgent) {
  if (httpRequestAgent && httpRequestAgent.options && httpRequestAgent.options.url && typeof httpRequestAgent.options.url === 'string') {
    return true;
  }
  return false;
}

// Resolves httpRequestAgent with given events
async function resolve(httpRequestAgent, events) {
  if (validParameters(httpRequestAgent)) {
    const url = utils.interpolateString(httpRequestAgent.options.url, events);

    try {
      // axios.get returns json response
      const response = await axios.get(url);
      events[httpRequestAgent.name] = response.data;
    } catch (error) {
      const agentName = httpRequestAgent.name ? httpRequestAgent.name : '';
      console.error(`HttpRequestAgent (${agentName}) failed \n`, error);
      process.exit();
    }
  } else {
    console.error('Invalid HttpAgent format');
  }
}

module.exports = { resolve };
