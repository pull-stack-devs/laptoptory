'use strict';

const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
  user: 'husam',
  host: 'localhost',
  database: 'inventory_app',
  password: '0000',
  port: 5432,
});

module.exports = pool;
