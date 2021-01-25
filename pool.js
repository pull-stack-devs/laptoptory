'use strict';

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'abdalrhman',
  host: 'localhost',
  database: 'inventory_app',
  password: 'aoaj@1992',
  port: 5432,
});
require('dotenv').config();

module.exports = pool;
