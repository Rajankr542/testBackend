const userServices = require('./userService');
const reportService = require('./reportsServices');

module.exports = { ...userServices, ...reportService};
