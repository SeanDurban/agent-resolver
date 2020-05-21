const mockConsole = require('jest-mock-console').default;
const printAgent = require('../../src/agents/printAgent');
const testData = require('../testData.json').testData;
const testPrintAgentDetails = require('../testData.json').testPrintAgent;

describe('resolve() test suite', () => {
    it('Successfully prints to console', () =>{
        const restoreConsole = mockConsole();
        printAgent.resolve(testPrintAgentDetails, testData)
        expect(console.log).toHaveBeenCalled();
        restoreConsole();
    });

    it('Successfully prints to console with null data', () =>{
        const restoreConsole = mockConsole();
        printAgent.resolve(testPrintAgentDetails, null)
        expect(console.log).toHaveBeenCalled();
        restoreConsole();
    });

    it('Prints error message if no message provided', () =>{
        const restoreConsole = mockConsole();
        printAgent.resolve(null, testData)
        expect(console.error).toHaveBeenCalled();
        restoreConsole();
    });

    it('Prints error message if message is not of type string', () =>{
        const restoreConsole = mockConsole();
        let invalidPrintAgentDetails = testPrintAgentDetails;
        invalidPrintAgentDetails.options.message = true;
        printAgent.resolve(invalidPrintAgentDetails, testData)
        expect(console.error).toHaveBeenCalled();
        restoreConsole();
    });
});
