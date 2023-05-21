const usersDao = require('./usersDao');
const reportsDao = require('./reportsDao');

module.exports = {...usersDao, ...reportsDao}
