const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

const generatePasswordHash = (password) => {
return passwordHash.generate(password);
}
const verifyPasswordHash = (password, hashedPassword) => {
return passwordHash.verify(password, hashedPassword);
}
const { JWT_SECRET = 'wmqU6aDVxKPA26FuO1RZFrm1Jfr7QuSYJzZ40byCUmc' } =
  process.env;

const createJWT = async (
    payload,
    secret = `${JWT_SECRET}`,
    options = {expiresIn: '24h'}
  ) => jwt.sign(payload, secret, options);
  
const verifyJWT = async (token, secret = `${JWT_SECRET}`) =>
    jwt.verify(token, secret);
  

module.exports = {generatePasswordHash, verifyPasswordHash, createJWT, verifyJWT}