const utils = require('./utils');

function resolve(agent, events) {
  const value = utils.interpolateString(agent.options.value, events);
  const expected = utils.interpolateString(agent.options.expected, events);
  if (!value || value !== expected) {
    console.error('Failed Trigger Agent');
    process.exit();
  }
}

module.exports = { resolve };
