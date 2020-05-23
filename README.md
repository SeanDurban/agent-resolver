# Agent Resolver
This program takes a json config file with details of the agents to be resolved. 
Agents are resovled sequentially, allowing data from subsequent execution to be passed down and utilised.

For example: 
- Retrieve location data from IP
- Use location data to retrieve the closest beach
- Use location and beach data to retrieve next high tide time
- Print this information

* Note only HttpRequestAgents and PrintAgents are currently implemented.

## Prerequisites
- Node.js and npm
- JSON file with agent(s) details in correct format


## Usage
(In project root dir)
Install the required node packages
```
npm install
```

Optionally install developer dependencies (if wish to run tests)
```
npm install --dev
```

To run the application, print agent prints to general std out.
```
npm start path/to/agents.json
```

To run tests (must have jest installed)
```
npm test
```

### Agent JSON file format
Below is a basic agent json file, all fields are required (for particular type)
Additional examples can be found in the tests folder (tests/testData.json)
```
{
"agents": [
    {
      "type": "HTTPRequestAgent",
      "name": "http",
      "options": {
        "url": "http://random.org"
      }
    },
    {
      "type": "PrintAgent",
      "name": "print",
      "options": {
        "message": "Data from http {{http.data.here}}"
      }
    }
  ]
}
```
