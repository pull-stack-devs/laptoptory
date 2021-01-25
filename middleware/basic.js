'use strict';

let base64 = require('base-64');
const Users = require('../crud_data/users-model')

module.exports = async (req, res, next) =>{
    console.log('inside basicAuth middleware');
    let authHeader = req.headers.authorization.split(' ');

    if (authHeader[0] != 'Basic') {
    next('invaid login');
    return;
    }
    let basic = authHeader.pop();
    let [username, password] = base64.decode(basic).split(':');
    console.log('before authenticate');
    let auth = await Users.authenticate({ username, password });
    console.log(auth);
    if (auth && auth[0].is_accepted) {
    console.log('before generateAToken');

    let token = await Users.generateToken({
        username,
        password,
        role: auth[0].role_name,
    });
    console.log('after generateAToken');
    console.log(token);
    req.user = auth;
    req.token = token;
    next();
    } else {
    next('invaid login');
    }

    
}


// console.log('inside basicAuth middleware');
//   let authHeader = req.headers.authorization.split(' ');

//   if (authHeader[0] != 'Basic') {
//     next('invaid login');
//     return;
//   }
//   let basic = authHeader.pop();
//   let [username, password] = base64.decode(basic).split(':');
//   console.log('before authenticate');
//   let auth = await Users.authenticate({ username, password });
//   console.log(auth);
//   if (auth) {
//     console.log('before generateAToken');
//     let token = await Users.generateAToken({
//       username,
//       password,
//       role: auth.role,
//     });
//     console.log('after generateAToken');
//     console.log(token);
//     req.user = auth;
//     req.token = token;
//     next();
//   } else {
//     next('invaid login');
//   }