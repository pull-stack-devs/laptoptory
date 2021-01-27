'use strict';

const Pool = require('pg').Pool;

let url = process.env.DATABASE_URL;
const pool = new Pool({
  url
});

module.exports = pool;
