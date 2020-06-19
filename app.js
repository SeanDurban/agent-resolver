const resolver = require('./src/resolver');

// example usage 'node resolver.js /path/to/jsonfile.json'
const { agents } = resolver.jsonFileParser(process.argv[2]);
resolver.resolveAgents(agents);
