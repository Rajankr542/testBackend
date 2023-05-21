const Users = require('../models/users');

const getUsersInstance = async (query, projection = {}) =>
Users.findOne(query, projection).lean().exec();

const createUsersDoc = async (UsersObj) =>
  new Users(UsersObj).save();

module.exports = {getUsersInstance, createUsersDoc}