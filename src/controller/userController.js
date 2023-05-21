const {
    registerService,
    loginService
    } = require('../service');
    const { OK, SERVER_ERROR, MESSAGE_CONSTANTS } = require('../constants');
    const logger = require('../config/logger');
    
const register = async (req, res) => {
  try {
    const regRes = await registerService(
      req.body
    );
    return res.status(OK).json(regRes);
  } catch (err) {
    logger.error(err);
    res.status(err.status || SERVER_ERROR).json({
      status: err.status || SERVER_ERROR,
      message: err.message || MESSAGE_CONSTANTS.INTERNAL_ERROR,
    });
  }
};

const login = async (req, res) => {
  try {
    const loginRes = await loginService(
      req.body
    );
    return res.status(OK).json(loginRes);
  } catch (err) {
    logger.error(err);
    res.status(err.status || SERVER_ERROR).json({
      status: err.status || SERVER_ERROR,
      message: err.message || MESSAGE_CONSTANTS.INTERNAL_ERROR,
    });
  }
};
  
  module.exports = {register, login }
  