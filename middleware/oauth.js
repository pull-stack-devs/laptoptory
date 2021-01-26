'use strict';
const users = require('../model/users-model');
const superagent = require('superagent');
require('dotenv').config();
const morgan = require('morgan');

const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken'; //post method
const userUrl = 'https://api.linkedin.com/v2/me'; //get method

const CLIENT_ID = process.env.CLIENT_ID;
const SECRET_ID = process.env.SECRET_ID;

module.exports = async function (req, res, next) {
  //1.get the code
  let code = req.query.code;
  console.log('(1) CODE ====== ', code);
  //2.get token
  let remoteToken = await exchangeCodeWithToken(code);
  console.log('(2) remoteToken =====> ', remoteToken);
  //3.get user object
  let remoteUser = await getRemoteUser(remoteToken);

  console.log('(3) remoteUser.login-----> ', remoteUser.login);
  let [localToken, localUser] = await getUser(remoteUser);
  console.log(
    '(4) localUser -----> ',
    localUser,
    ' localToken ===> ',
    localToken
  );
  req.user = localUser;
  req.token = localToken;

  next();
};

async function exchangeCodeWithToken(code) {
  //token url use
  try {
    let tokenResponse = await superagent
      .post(tokenUrl)
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .send({
        content_type: 'application/x-www-form-urlencoded',
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: 'http://localhost:3000/oauth',
        client_id: CLIENT_ID,
        client_secret: SECRET_ID,
      });
    return tokenResponse.body.access_token;
  } catch (err) {
    console.error(err);
  }
}

async function getRemoteUser(token) {
  try {
    let useResponse = await superagent
      .get(userUrl)
      .set('Authorization', `Bearer ${token}`)
      .set('user-agent', '401d6-app');

    let user = useResponse.body;
    console.log('user object=======>>>>', user);
    return user;
  } catch (err) {
    console.log('this is when get remoteuser fail', err);
  }
}


async function getUser(userObj) {
  console.log('userobj-------', userObj);
  let userRecord = {
    username: userObj.localizedFirstName,
    role_name: 'user',
    password: 'userObj.password',
    email: 'test@xyz.com',
    name: `${userObj.localizedFirstName} ${userObj.localizedLastName}`,
    is_accepted: false,
  };
  
  let exist = await users.get(userRecord.username);
  console.log(exist);
  if (exist.length > 0) {
    let token = await users.generateToken(exist[0]);
    return [token, exist];
  } else {
    let record = await users.create(userRecord);
    let token = await users.generateToken(userRecord);
    return [token, record];
  }
}
