const mockConsole = require('jest-mock-console').default;
const resolver = require('../src/resolver');
const testAgents = require('./testData.json').testAgents;
const testSeqAgents = require('./testData.json').testAgents2;
const unsupportedAgents = require('./testData.json').unsupportedAgents;
const nock = require('nock');

describe('resolveAgents test suite', () => {

    test('Successfully resolves testAgents with mocked http req', async () => {  
        // Set up mocks
        const httpMock = nock(testAgents[0].options.url)
            .get('/')
            .reply(200, {
                "status" : "success0"
            });

        const httpMock2 = nock(testAgents[1].options.url)
            .get('/')
            .reply(200, {
                "status" : "success1"
            });

        const restoreConsole = mockConsole();

        await resolver.resolveAgents(testAgents);

        expect(console.log).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
        expect(console.log.mock.calls[0][0]).toBe(testAgents[2].expectedMessage);

        // Restore mocks
        httpMock.done(); 
        httpMock2.done();
        restoreConsole();
    });

    test('Successfully resolves testAgents with mocked http req in order', async () => {  
        // Setup mocks
        const httpMock = nock(testSeqAgents[0].options.url)
            .get('/')
            .delay(1000)
            .reply(200, {
                "status" : "delayed-res"
            })
            .persist();

        const httpMock2 = nock(testSeqAgents[1].options.url)
            .get('/')
            .reply(200, {
                "status" : "fast-res"
            });

        const httpMock3 = nock(testSeqAgents[4].options.url)
        .get('/')
        .reply(200, {
            "status" : "last-res"
        });

        const restoreConsole = mockConsole();

        await resolver.resolveAgents(testSeqAgents);

        expect(console.log).toHaveBeenCalled();
        expect(console.error).not.toHaveBeenCalled();
        expect(console.log.mock.calls[0][0]).toBe(testSeqAgents[3].expectedMessage);

        // Restore mocks
        httpMock.done(); 
        httpMock2.done();
        httpMock3.done();
        restoreConsole();
    }, 10000);

    test('Prints error message if an unsupported agent type', () => {
        const restoreConsole = mockConsole();
        resolver.resolveAgents(unsupportedAgents)
        expect(console.error).toHaveBeenCalled();
        restoreConsole();
    });

    test('Prints error message if agents is null or empty', () => {
        const restoreConsole = mockConsole();
        resolver.resolveAgents(null)
        expect(console.error).toHaveBeenCalled();
        restoreConsole();
    });
});

describe('jsonFileParser test suite', () => {
    test('Prints error and exits with invalid path', () => {
        // Setup mocks
        const mockExit = jest.spyOn(process, 'exit')
            .mockImplementation(() => {});

        const restoreConsole = mockConsole();

        resolver.jsonFileParser('/path/to/nowhere.json');

        expect(mockExit).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();

        // Restore mocks
        mockExit.mockRestore();
        restoreConsole();
    });

    test('Prints error and exits with null path', () => {
        // Setup mocks
        const mockExit = jest.spyOn(process, 'exit')
            .mockImplementation(() => {});

        const restoreConsole = mockConsole();

        resolver.jsonFileParser(null);

        expect(mockExit).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalled();

        // Restore mocks
        mockExit.mockRestore();
        restoreConsole();
    });
});