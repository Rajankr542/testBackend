const {
getReposrtServices
} = require('../service');
const { OK, SERVER_ERROR, MESSAGE_CONSTANTS } = require('../constants');
const logger = require('../config/logger');
    
const getReportController = async (req, res) => {
  try {
    const regRes = await getReposrtServices(
      req.query
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

module.exports = { getReportController }
  