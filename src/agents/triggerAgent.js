/* eslint-disable no-param-reassign */
const utils = require('./utils');

async function resolve(agent, events) {
  const value = utils.interpolateString(agent.options.value, events);
  const expected = utils.interpolateString(agent.options.expected, events);
  if (!value || value !== expected) {
    // console.error('Failed Trigger Agent');
    // process.exit();
    events[agent.name] = false;
    throw new Error('Trigger failed');
  }
  events[agent.name] = true;
}

module.exports = { resolve };
