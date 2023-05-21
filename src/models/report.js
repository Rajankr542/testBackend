const mongoose = require('mongoose');
const { Schema } = mongoose;

const reportSchema = new Schema({
  keyOne:  {
    type: String,
  },
  KeyTwo: {
    type:String,
  },
  report_type: {
    type: String,
  }
}, { timestamps: {} });

module.exports = mongoose.model('Reports', reportSchema);
