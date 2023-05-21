/**
 * @file This file define the validation used in gamePlayer routes.
 */
const Joi = require('joi');

const userValidation = {
    create: {
        body: Joi.object().keys({
            email: Joi.string().required().trim(),
            password: Joi.string().required().trim()
        }),
    },
    login: {
        body: Joi.object().keys({
            email: Joi.string().required().trim(),
            password: Joi.string().required().trim()
        }),
    },
};

module.exports = {
    userValidation
}
