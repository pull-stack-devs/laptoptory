'use strict';

const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASS,
  port: 5432,
});

module.exports = pool;
