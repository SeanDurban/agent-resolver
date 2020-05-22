const resolver = require('./src/resolver');

// example usage 'node resolver.js /path/to/jsonfile.json'
let agents = resolver.jsonFileParser(process.argv[2]).agents;
resolver.resolveAgents(agents);