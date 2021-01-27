'use strict';

const pg = require('pg');
let pool = require('../pool');
const errorHandler = require('../middleware/500');

class Role {
  constructor() {}
  async create(data) {
    let VALUES = [data.name, data.permission];
    let SQL = `INSERT INTO roles(name, permission) VALUES($1, $2) RETURNING *`;
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
      console.log('err>>>>', err)
      errorHandler(err);
    }
  }

  async get(role_name) {
    let sql = `SELECT * FROM roles WHERE name = $1`;
    try {
      let {rows} = await pool.query(sql, [role_name]);
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
    let VALUES = [data.name, data.permission, data.id];
    let SQL = `UPDATE roles SET name = $1, permission = $2 WHERE id = $3 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Role();
