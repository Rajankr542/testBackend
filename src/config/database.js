const Mongoose = require('mongoose');
Mongoose.Promise = global.Promise;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const dbConnect = async (connection) => {
  return await Mongoose.connect(`${connection}`, options);
};
module.exports = dbConnect;
