const Reports = require('../models/report');
const {
    setKeyValue,
    getKeyValue,
  } = require('../config/redis');

const getReportsInstance = async (query, projection = {}) => {
try {
const key = JSON.stringify(query);
const res = await getKeyValue(key);
if (res) {
return res;
}
const resToSend = await Reports.findOne(query, projection).lean().exec();
await setKeyValue(key, resToSend);
return resToSend;
} catch (err) {
    throw err;
}
}

const createReportsDoc = async (ReportsObj) =>
  new Reports(ReportsObj).save();

module.exports = {getReportsInstance, createReportsDoc}