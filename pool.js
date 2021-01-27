'use strict';

const Pool = require('pg').Pool;

let url = process.env.DATABASE_url;
const pool = new Pool({
  url
});

module.exports = pool;
