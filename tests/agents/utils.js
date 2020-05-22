const utils = require('../../src/agents/utils');

const testData = require('../testData.json').testData;

describe('getNestedProperty unit tests', () => {


    test('Successfully gets nested property at top level', () => {
        expect(utils.getNestedProperty(testData, "validated")).toBe(true);
    });

    test('Successfully gets nested property', () => {
        expect(utils.getNestedProperty(testData, "location.state")).toBe("OR");
    });

    test('Successfully gets deeper nested property', () => {
        expect(utils.getNestedProperty(testData, "location.stats.capital.pop")).toBe(1000);
    });

    test('Returns undefined if property does not exist', () => {
        expect(utils.getNestedProperty(testData, "location.county.pop")).toBe(undefined);
    });

    test('Returns null if object is null', () => {
        expect(utils.getNestedProperty(null, "path/to/property")).toBe(null);
    });

    test('Returns null if path is null', () => {
        expect(utils.getNestedProperty(testData, null)).toBe(null);
    });

    test('Returns null if path is not of type string', () => {
        expect(utils.getNestedProperty(testData, 0)).toBe(null);
    });
});

describe('interpolateString unit tests', () => {
    test('Successfully replaces with correct values', () => {
        expect(utils.interpolateString('state: {{location.state}} capital: {{location.stats.capital.name}}.', testData))
            .toBe('state: OR capital: Salem.')
    });

    test('Successfully matches to all valid url characters', () => {
        // assuming valid - a-z, A-Z, 0-9, underscore, dash, ~, fullstop
        expect(utils.interpolateString('state: {{location.S-t_a~t.e}}.', testData))
            .toBe('state: .')
    });

    test('Returns empty string if value does not exist in given data', () => {
        expect(utils.interpolateString('{{random.fact}}', testData))
            .toBe('')
    });

    test('Returns string with mismatched braces persisting', () => {
        expect(utils.interpolateString('{{abc', testData))
            .toBe('{{abc')
    });

    test('Returns empty string if string parameter is null', () => {
        expect(utils.interpolateString(null, testData))
            .toBe('')
    });

    test('Returns empty string if string parameter is not of type string', () => {
        expect(utils.interpolateString(0, testData))
            .toBe('')
    });

    test('Returns string with correct empty values if data is null', () => {
        expect(utils.interpolateString('{{random.fact}}', null))
            .toBe('')
    });
});