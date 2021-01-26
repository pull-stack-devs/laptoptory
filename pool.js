'use strict';

const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'abdalrhman',
  host: 'localhost',
  database: 'inventory_app',
  password: 'aoaj@1992',
  port: 5432,
});

module.exports = pool;
