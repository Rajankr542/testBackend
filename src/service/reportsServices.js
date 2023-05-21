const {
    MESSAGE_CONSTANTS,
    SERVER_ERROR
  } = require('../constants');
  const { CustomError } = require('../helper');
  const {
    getReportsInstance
  } = require('../dao');

const getReposrtServices = async (payload) => {
    try {
    const data = await getReportsInstance(payload);
      return {
        data: data || [],
        message: MESSAGE_CONSTANTS.REPORT_FETCHED,
      };
    } catch (error) {
      throw new CustomError(
        SERVER_ERROR,
        error.message ? error.message : MESSAGE_CONSTANTS.INTERNAL_ERROR
      );
    }
};

module.exports = {getReposrtServices};
