// Validations for inquirer questions in index.js

const validateDepartmentName = text => {
    if (text.length < 1) {
        return "Please enter a valid department name";
    }
    return true;
}
const validateRoleName = text => {
    if (text.length < 1) {
        return "Please enter a valid role name";
    }
    return true;
}
const validateSalary = value => {
    const valid = (!isNaN(value) && (value !== 0))
    return valid || 'Please press the up arrow button and enter a valid salary'
}
const validateFirstName = text => {
    if (text.length < 1) {
        return "Please enter a valid First Name";
    }
    return true;
}
const validateLastName = text => {
        if (text.length < 1) {
            return "Please enter a valid Last Name";
        }
        return true;
}

const validate = {
    validateDepartmentName,
    validateRoleName,
    validateSalary,
    validateFirstName,
    validateLastName
}

module.exports = validate