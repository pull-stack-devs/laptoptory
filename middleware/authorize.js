'use strict';
const roles = require('../model/role-model');

module.exports = (capability) => {
  return async (req, res, next) => {
    console.log('inside authorize');
    console.log(req.user);
    let usr = req.user;
    let role_data = await roles.get(usr.role_name);
    console.log("persmission>>>> ", role_data)
    if (role_data[0].permission.includes(capability)) {
      next();
    } else {
      res.status(403).send('Access Denied!');
    }
  };
};