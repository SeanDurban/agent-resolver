
const regex = /{{[A-Z, a-z,0-9,\-,\_,\~,\.]+(\.[A-Z, a-z,0-9,\-,\_,\~,\.],+)*}}/g;
const noBraces = 2;

// Replaces hardcoded objects with relevant data in given string
// expects {{object.property}} format that matches above regex
// Returns new string with values replaced (if exists in data, otherwise empty string)
function interpolateString(string, data) {
    if(string == null || typeof string != "string"){
        return "";
    }
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
    if(object == null || path == null || typeof path != "string") {
        return null;
    }
    return path
        .split('.')
        .reduce((object, property) => 
            object == null ? null : object[property], object);
}

module.exports = {interpolateString, getNestedProperty};