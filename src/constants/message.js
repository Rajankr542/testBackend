/**
 * @file List of all message constants used
 */

const MESSAGE_CONSTANTS = Object.freeze({
    /* Common messages */
    RESOURCE_NOT_FOUND: 'Resource not found.',
    SUCCESS: 'success',
    INTERNAL_ERROR:
      'Internal server error' /** Since rewards error are not well defined */,
    /* message used in service folder */
    INVALID_LOGIN_CREDENTIALS: 'Invalid login credentials.',
    DEACTIVATED_LOGIN_CREDENTIALS:
      'Account has been deactivated, please contact admin.',
    SUCCESSFULLY_LOGIN: 'user successfully login',
    USER_CREATED: 'user created successfully',
    USER_NOT_FOUND: 'user not found',
    AUTHENTICATION_TOKEN_MISSING: 'Token is missing',
    INVALID_AUTH_TOKEN: 'invalid Auth',
    REPORT_FETCHED: 'Report fetched successfully'
  });
  
module.exports = {
  MESSAGE_CONSTANTS
}