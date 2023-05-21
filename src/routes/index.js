const express = require('express');
const userRoute = require('./userRoutes');
const reportRoutes = require('./reportRoutes');

const router = express.Router({ mergeParams: true });

router.use('/user', userRoute);
router.use('/reports', reportRoutes);
module.exports = router;