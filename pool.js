'use strict';

const Pool = require('pg').Pool;
let connectionString = process.env.DATABASE_URL;
/*
const pool = new Pool({
  connectionString,
});
*/


const pool = new Pool({
  connectionString,
  ssl: {
    rejectUnauthorized: false,
  },
});
module.exports = pool;

/*

user: 'husam',
  host: 'localhost',
  database: 'inventory_app',
  password: '0000',
  port: 5432,

  */
