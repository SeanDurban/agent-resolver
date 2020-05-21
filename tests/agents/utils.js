const utils = require('../../src/agents/utils');

const testData = require('../testData.json').testData;

describe('getNestedProperty unit tests', () => {


    it('Successfully gets nested property at top level', () => {
        expect(utils.getNestedProperty(testData, "validated")).toBe(true);
    });

    it('Successfully gets nested property', () => {
        expect(utils.getNestedProperty(testData, "location.state")).toBe("OR");
    });

    it('Successfully gets deeper nested property', () => {
        expect(utils.getNestedProperty(testData, "location.stats.capital.pop")).toBe(1000);
    });

    it('Returns undefined if property does not exist', () => {
        expect(utils.getNestedProperty(testData, "location.county.pop")).toBe(undefined);
    });

    it('Returns null if object is null', () => {
        expect(utils.getNestedProperty(null, "path/to/property")).toBe(null);
    });

    it('Returns null if path is null', () => {
        expect(utils.getNestedProperty(testData, null)).toBe(null);
    });

    it('Returns null if path is not of type string', () => {
        expect(utils.getNestedProperty(testData, 0)).toBe(null);
    });
});

describe('interpolateString unit tests', () => {
    it('Successfully replaces with correct values', () => {
        expect(utils.interpolateString('state: {{location.state}} capital: {{location.stats.capital.name}}.', testData))
            .toBe('state: OR capital: Salem.')
    });

    it('Returns empty string if value does not exist in given data', () => {
        expect(utils.interpolateString('{{random.fact}}', testData))
            .toBe('')
    });

    it('Returns string with mismatched braces persisting', () => {
        expect(utils.interpolateString('{{abc', testData))
            .toBe('{{abc')
    });

    it('Returns empty string if string parameter is null', () => {
        expect(utils.interpolateString(null, testData))
            .toBe('')
    });

    it('Returns empty string if string parameter is not of type string', () => {
        expect(utils.interpolateString(0, testData))
            .toBe('')
    });

    it('Returns string with correct empty values if data is null', () => {
        expect(utils.interpolateString('{{random.fact}}', null))
            .toBe('')
    });
});