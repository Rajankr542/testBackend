
/** In this file you can configure migrate-mongo */
require("dotenv").config();

// In this file you can configure migrate-mongo


const { MONGODB_URI, DB_NAME } = process.env;
const config = {
  mongodb: {
    url: `${MONGODB_URI}`,
    databaseName: `${DB_NAME}`,
    options: {
      useNewUrlParser: true, // removes a deprecation warning when connecting
      useUnifiedTopology: true, // removes a deprecating warning when connecting
    },
  },
  migrationsDir: "src/migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;