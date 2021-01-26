'use strict';
const users = require('../crud_data/users-model');
require('dotenv').config;
async function bearerMiddleware(req, res, next) {
  if (!req.headers.authorization) {
    next('not LoggedIn!');
    return;
  }
  let authHeader = req.headers.authorization.split(' ');

  if (authHeader[0] != 'Bearer') {
    next('invalid Header!');
    return;
  }

  let token = authHeader[1];
  console.log(authHeader[1]);

  let result = await users.authenticateToken(token, process.env.SECRET);
  console.log(result);
  let checkUserExist = await users.get(result.username);
  console.log("User>>>>>> ", checkUserExist);
  if (checkUserExist) {
    req.user = checkUserExist[0];
    next();
  } else {
    next('ERR!');
  }
}
module.exports = bearerMiddleware;