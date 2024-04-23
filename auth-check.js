const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./constants');

function authCheck(token) {
  try {
    const verifyResult = jwt.verify(token, JWT_SECRET);
    return true;
  } catch (error) {
    return false;
  }
}

module.exports = { authCheck };
