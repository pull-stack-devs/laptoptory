'use strict';
const laptopsLog = require('./schema/schema');

class Log {
  constructor() {
    this.schema = laptopsLog;
  }

  async create(record) {
    let newRecord = new this.schema(record);
    return newRecord.save();
  }

  async read() {
    return this.schema.find();
  }

}

module.exports = new Log();