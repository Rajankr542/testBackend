const validate = require("express-joi-validator");
const express = require("express");
const { userValidation } = require("../validations");
const { catchValidationErrors } = require("../middleware");
const {
register,
login
} = require("../controller");

const userRoute = express.Router({ mergeParams: true });

userRoute.post(
'/register',
validate(userValidation.create),
catchValidationErrors,
register
);

userRoute.post(
'/login',
validate(userValidation.login),
catchValidationErrors,
login
);


module.exports = userRoute;
