
const regex = /{{[A-Z, a-z]+(\.[A-Z, a-z]+)*}}/g;
const noBraces = 2;

// Replaces hardcoded objects with relevant data in given string
// expects {{object.property}} format
// Returns new string with values replaced (if exists, otherwise empty string)
function interpolateString(string, data) {
    let matches = string.match(regex);
    if(matches) {
        matches.forEach((match) => {
            let stringReference = match.substring(noBraces, match.length - noBraces);

            let dataValue = getNestedProperty(data, stringReference);

            // Should objects be parsed? eg if "location" should it be [object Object] or parsed object or ''
            let newValue = dataValue ? dataValue : '';

            // (need to be careful about race conditions on the string here?)
            string = string.replace(match, newValue)
        });
    }
    return string;
}

// No trivial way to generically access nested property of js object with a string
// eg) "location.city" would be obj["location"]["city"]
// This function uses the reduce function with the path string to step into given object
function getNestedProperty(object, path) {
    return path
        .split('.')
        .reduce((object, property) => 
            object == null ? null : object[property], object);
}

module.exports = {interpolateString};