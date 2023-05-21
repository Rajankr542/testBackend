const _ = require('lodash');
const logger = require('../config/logger');
const { CustomError } = require('../helper');
const { UN_PROCESSABLE_ENTITY } = require('../constants');

/**
 * This function will catch the validation errors as middleware
 * @property {object} err - joi validation error object
 * @property {object} req - express request object
 * @property {object} res - express response object
 * @property {object} next - middleware function to continue req execution
 * @returns {object} res object is returned if the validation error occurs otherwise continue execution
 */

const catchValidationErrors = (err, req, res, next) => {
  if (err.isBoom) {
    const {
      data,
      output: {
        payload: { statusCode },
      },
    } = err;
    const errorDetails = _.map(
      data,
      _.partialRight(_.pick, ['message', 'path', 'type'])
    );
    if (!_.has(errorDetails[0], 'message')) {
      errorDetails = [];
      errorDetails.push({
        message: 'Invalid inputs',
        path: `${req.path}`,
        type: `${req.method}`,
      });
    } else if (
      errorDetails[0].message.includes("fails to match the required pattern")
    ) {
      errorDetails[0].message = "Please enter valid input.";
    }

    logger.error(`Input's provided is not valid : ${err.message}`);
    return res
      .status(statusCode || UN_PROCESSABLE_ENTITY)
      .json({ status: statusCode, message: errorDetails[0].message })
      .end();
  }
  if (err instanceof CustomError) {
    const { status, message } = err;
    logger.error(err.stack);
    return res
      .status(err.status)
      .json({ status, message })
      .end();
  }
  console.log("errinside soi", err.message, err);
  return next();
};

/**
 * This function will catch the validation errors as middleware
 * @property {object} err - joi validation error object
 * @property {object} req - express request object
 * @property {object} res - express response object
 * @property {object} next - middleware function to continue req execution
 * @returns {object} res object is returned if the validation error occurs otherwise continue execution
 */
const catchValidationErrorsCustom = (err, req, res, next) => {
  if (err.isBoom) {
    const {
      data,
      output: {
        payload: { statusCode, message },
      },
    } = err;
    return res
      .status(UN_PROCESSABLE_ENTITY)
      .json({ status: statusCode, message, errData: data })
      .end();
  }
  if (err instanceof CustomError) {
    const { status, message } = err;
    logger.error(err.stack);
    return res
      .status(err.status)
      .json({ status, message })
      .end();
  }
  return next();
};

module.exports = {
catchValidationErrors, 
catchValidationErrorsCustom
};