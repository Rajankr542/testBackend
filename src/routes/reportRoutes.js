const validate = require("express-joi-validator");
const express = require("express");
const { reportValidation } = require("../validations");
const { catchValidationErrors, authrnticateToken } = require("../middleware");
const {
getReportController
} = require("../controller");

const reportRoutes = express.Router({ mergeParams: true });

reportRoutes.get(
'/',
validate(reportValidation.getQuery),
authrnticateToken,
catchValidationErrors,
getReportController
);

module.exports = reportRoutes;
