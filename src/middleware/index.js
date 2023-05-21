const validations = require('./catchValidationError');
const auth = require('./auth');
module.exports = {...validations, ...auth}