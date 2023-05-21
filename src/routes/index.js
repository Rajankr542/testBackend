const express = require('express');
const userRoute = require('./userRoutes');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoute);
module.exports = router;