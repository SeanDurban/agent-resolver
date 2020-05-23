/* eslint-disable no-undef */
const mockConsole = require('jest-mock-console').default;
const nock = require('nock');
const httpRequestAgent = require('../../src/agents/httpRequestAgent');
const { testData } = require('../testData.json');
const testHttpRequestAgentDetails = require('../testData.json').testHTTPRequestAgent;

describe('resolve() test suite', () => {
  test('Successfully completes request and assigns response value to events', async () => {
    // Mocks http request
    const scope = nock(testHttpRequestAgentDetails.options.url)
      .get('/')
      .reply(200, {
        success: true,
      });

    await httpRequestAgent.resolve(testHttpRequestAgentDetails, testData);

    expect(testData.test.success).toBe(true);

    // Restore mocks
    scope.done();
  });

  test('Successfully exits execution when the response status code is not 2xx', async () => {
    // Mocks the process.exit() call
    const mockExit = jest.spyOn(process, 'exit').mockImplementation(() => {});

    const scope = nock(testHttpRequestAgentDetails.options.url)
      .get('/')
      .reply(404, null);

    // Mocks console statements
    const restoreConsole = mockConsole();

    await httpRequestAgent.resolve(testHttpRequestAgentDetails, testData);

    expect(mockExit).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalled();

    // Restore mocks
    scope.done();
    mockExit.mockRestore();
    restoreConsole();
  });

  it('Prints error message if no message provided', () => {
    const restoreConsole = mockConsole();
    httpRequestAgent.resolve(null, testData);
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
  });

  it('Prints error message if message is not of type string', () => {
    const restoreConsole = mockConsole();
    const invalidAgentDetails = testHttpRequestAgentDetails;
    invalidAgentDetails.options.url = true;
    httpRequestAgent.resolve(invalidAgentDetails, testData);
    expect(console.error).toHaveBeenCalled();
    restoreConsole();
  });
});
