'use strict';

const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'husam',
  host: 'localhost',
  database: 'inventory_app',
  password: '0000',
  port: 5432,
});
require('dotenv').config();

module.exports = pool;
