/* eslint-disable no-console */
const utils = require('./utils');

function validParameters(printAgentDetails) {
  if (printAgentDetails && printAgentDetails.options && printAgentDetails.options.message
        && typeof printAgentDetails.options.message === 'string') {
    return true;
  }

  return false;
}

async function resolve(printAgentDetails, data) {
  if (validParameters(printAgentDetails)) {
    const output = utils.interpolateString(printAgentDetails.options.message, data);
    console.log(output);
  } else {
    console.error('Invalid PrintAgent format');
  }
}

module.exports = { resolve };
