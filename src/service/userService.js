const {
    MESSAGE_CONSTANTS,
    SERVER_ERROR,
    BAD_REQUEST
  } = require('../constants');
  const { CustomError, generatePasswordHash, createJWT ,verifyPasswordHash } = require('../helper');
  const {
    createUsersDoc,
    getUsersInstance
  } = require('../dao');

const registerService = async (payload) => {
    try {
    const userCreatePayload = { ...payload, password: generatePasswordHash(payload.password)}
    const {email, _id} = await createUsersDoc(userCreatePayload);
    const token =  await createJWT({
      email,
      _id,
    });
      return {
        data: {token},
        message: MESSAGE_CONSTANTS.USER_CREATED,
      };
    } catch (error) {
      throw new CustomError(
        SERVER_ERROR,
        error.message ? error.message : MESSAGE_CONSTANTS.INTERNAL_ERROR
      );
    }
};

const loginService = async (payload) => {
    try {
      const query = {email: payload.email};
    const user = await getUsersInstance(query);
    const validatePassword = verifyPasswordHash(payload.password, user.password);
    if (validatePassword) {
      const token =  await createJWT({
        email: user.email,
        _id: user._id,
      });
      return {
        data: {token},
        message: MESSAGE_CONSTANTS.SUCCESSFULLY_LOGIN,
      };
    } else {
     throw new CustomError(
      BAD_REQUEST,
      MESSAGE_CONSTANTS.INVALID_LOGIN_CREDENTIALS
     );
    }
    } catch (error) {
      throw new CustomError(
        SERVER_ERROR,
        error.message ? error.message : MESSAGE_CONSTANTS.INTERNAL_ERROR
      );
    }
};

module.exports = {registerService, loginService};
