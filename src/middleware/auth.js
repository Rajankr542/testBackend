const { CustomError, verifyJWT } = require('../helper');
const {
    MESSAGE_CONSTANTS,
    UN_PROCESSABLE_ENTITY,
    UNAUTHORIZED,
    FORBIDDEN,
    NOT_FOUND
  } = require ("../constants");
  const { getUsersInstance } = require("../dao");

const authrnticateToken = async (req, res, next) => {
    try{
    const token = req.get('authorization');
    if (!token) {
      next(
        new CustomError(FORBIDDEN, MESSAGE_CONSTANTS.AUTHENTICATION_TOKEN_MISSING)
      );
    }
    let verifyToken;
    try {
      verifyToken = await verifyJWT(token);
    } catch (e) {
      next(new CustomError(UNAUTHORIZED, MESSAGE_CONSTANTS.INVALID_AUTH_TOKEN));
    }
    if (!verifyToken) {
      next(
        new CustomError(
          UN_PROCESSABLE_ENTITY,
          MESSAGE_CONSTANTS.INVALID_AUTH_TOKEN
        )
      );
    }
    const { _id } = verifyToken;
    const activeUser = await getUsersInstance(
      { _id }
    );
  
    if (!activeUser) {
      next(new CustomError(NOT_FOUND, MESSAGE_CONSTANTS.USER_NOT_FOUND));
    }
    req.activeUser = activeUser;
    next();
} catch (err) {
    next(new CustomError(500, err.message));
}
  };

  module.exports = { authrnticateToken };