'use strict';

const pg = require('pg');
let pool = require('../pool');

class Role {
  constructor() {}
  async create(data) {
    let VALUES = [data.name];
    let SQL = `INSERT INTO roles(name) VALUES($1) RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async read() {
    let SQL = `SELECT * FROM roles`;
    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async delete(data) {
    let VALUES = [data.id];
    let SQL = `DELETE FROM roles WHERE id = $1`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async update(data) {
    let VALUES = [data.name, data.id];
    let SQL = `UPDATE roles SET name = $1 WHERE id = $2 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Role();
