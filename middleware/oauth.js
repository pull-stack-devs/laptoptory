'use strict';
const users = require('../crud_data/users-model');
const superagent = require('superagent');
require('dotenv').config();

const tokenUrl = 'https://www.linkedin.com/oauth/v2/accessToken';//post method
const userUrl = 'https://api.linkedin.com/v2/me';//get method

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
    console.log("(3) remoteUser.login-----> ", remoteUser.login);
    let [localUser, localToken] = await getUser(remoteUser);
    console.log("(4) localUser -----> ", localUser, " localToken ===> ", localToken);
    req.user = localUser;
    req.token = localToken;
    next();
}

async function exchangeCodeWithToken(code) {
    //token url use
    let tokenResponse = await superagent.post(tokenUrl).send({
        grant_type: authorization_code,
        code:code,
        redirect_uri:'http://localhost:3000/oauth',
        client_id: CLIENT_ID,
        client_secret: SECRET_ID,
    });
    console.log('tokenresponse', tokenResponse.body)
    return tokenResponse.body.access_token;
};

async function getRemoteUser(token) {
    console.log('inside getremoteuser')
    try {
        let useResponse = await superagent.get(userUrl)
            .set('Authorization', `token ${token}`)
            .set('user-agent', '401d6-app')
        console.log('useResponse----->', useResponse);
        let user = useResponse.body;
        return user;
    } catch (err) { console.log('this is when get remoteuser fail', err) }
}

async function getUser(userObj) {
    console.log('userobj-------', userObj)
    let userRecord = {
        username: userObj.login,
        password: 'userObj.password'
    };
    let isExist = await users.get({ username: userRecord.username });
    if (isExist.length > 0) {
        let user = isExist;
        let token = await users.generateToken(user);
        return [user, token];
    }
    let user = await users.save(userRecord);
    let token = await users.generateToken(user);
    return [user, token];
}

