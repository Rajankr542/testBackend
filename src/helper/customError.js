/**
 * @file This file extends Error class with status, message and errors fields.
 * @example throw new CustomError(status, message, errors)
 */
function CustomError(status, message) {
  /** Pass remaining arguments (including vendor specific ones) to parent constructor */
  Error.call(this);
  this.status = status;
  this.message = message;
}
CustomError.prototype = Object.create(Error.prototype);
CustomError.prototype.constructor = CustomError;
module.exports = { CustomError };
