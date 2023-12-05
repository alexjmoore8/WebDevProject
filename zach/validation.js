export function checkString(strVal, varName) {
    if (!strVal) throw `Error: You must supply a ${varName}!`;
    if (typeof strVal !== 'string') throw `Error: ${varName} must be a string!`;
    strVal = strVal.trim();
    if (strVal.length === 0)
      throw `Error: ${varName} cannot be an empty string or string with just spaces`;
    if (!isNaN(strVal))
      throw `Error: ${strVal} is not a valid value for ${varName} as it only contains digits`;
    return strVal;
  }

 export function checkStringArray(arr, varName) {
    //We will allow an empty array for this,
    //if it's not empty, we will make sure all tags are strings
    if (!arr || !Array.isArray(arr))
      throw `You must provide an array of ${varName}`;
    for (let i in arr) {
      if (typeof arr[i] !== 'string' || arr[i].trim().length === 0) {
        throw `One or more elements in ${varName} array is not a string or is an empty string`;
      }
      arr[i] = arr[i].trim();
    }

    return arr;
  }

  export function checkLocation(location, field){
    var regex = /([A-Za-z]+(?: [A-Za-z]+)*),? ([A-Za-z]{2})/
    const isValid = regex.test(location);
    if (!isValid) throw `Error: ${field} is a invalid location!`;

    return location;
  }

  export function checkNumber(salary, field){
    salary = salary.trim();
    if (salary.length === 0)
      throw `Error: ${field} cannot be an empty string or string with just spaces`;

    if (typeof salary !== 'number')
      throw 'Error: Must be a number!'
  }