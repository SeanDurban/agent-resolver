/* eslint-disable no-console */
const utils = require('./utils');

function validParameters(printAgentDetails) {
  if (printAgentDetails && printAgentDetails.options && printAgentDetails.options.message
        && typeof printAgentDetails.options.message === 'string') {
    return true;
  }
  return false;
}

// Resolves the print agent with given events
async function resolve(printAgent, events) {
  if (validParameters(printAgent)) {
    const output = utils.interpolateString(printAgent.options.message, events);
    console.log(output);
  } else {
    console.error('Invalid PrintAgent format');
  }
}

module.exports = { resolve };
