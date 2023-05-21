/**
 * @file This file define the validation used in gamePlayer routes.
 */
const Joi = require('joi');

const reportValidation = {
    getQuery: {
        query: Joi.object().keys({
            report_type: Joi.string().trim()
        }),
    }
};

module.exports = {
    reportValidation
}
