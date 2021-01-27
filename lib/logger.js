'use strict';

const log = require('../model/log-model');
const errorHandler = require('../middleware/500');
const logAction = async (data) => {
  try {
    let logRecord = await log.create(data);
    console.log(logRecord);
    return;
  } catch (err) {
    console.log(err);
  }
};

module.exports = logAction;
