const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet  = require('helmet');
const logger = require('./src/config/logger');
const connectDb = require('./src/config/database');
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(
  bodyParser.json({
    type: 'application/json',
    limit: '300mb',
    extended: false,
  }),
);
app.use(cors());
app.use(helmet())
app.use(compression());
app.use(function(req, res, next) {
  res.header("X-XSS-Protection", "1; mode=block");
  next();
});

const router = require('./src/routes/index');
app.use('/api',router);
require('./src/models/index');

connectDb(process.env.MONGODB_URI).then(
    async () => {
      logger.info('Database connected =>');
      app.listen(process.env.PORT, () => {
        logger.info(`App listening on port ${process.env.PORT}!`);
      });
    },
    (err) => {
      logger.error(`Can not connect to the database${err}`);
    },
).catch((err) => {
    logger.error('Failed to get connect to database', err);
});