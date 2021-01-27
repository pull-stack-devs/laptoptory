'use strict';

const Pool = require('pg').Pool;
require('dotenv').config();
let url = 'postgres://furjbrlrrrfcew:37a8a307e807cc75a06bf409ea4b3a5c9f78b5af052f2e6bbd972294cdc25e86@ec2-34-248-165-3.eu-west-1.compute.amazonaws.com:5432/dcli37iogr3ev1'
const pool = new Pool({
  url
});

module.exports = pool;
