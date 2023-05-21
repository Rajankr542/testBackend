const userController = require('./userController');
const reportController = require('./reportController');
module.exports = {...userController, ...reportController};
