'use strict';

let pool = require('../pool');
let errorHandler = require('../middleware/500');

class User {
  constructor() {}
  async create(data) {
    let VALUES = [
      data.username,
      data.role_name,
      data.password,
      data.email,
      data.name,
    ];
    let SQL = `INSERT INTO users(username, role_name, password, email, name) VALUES($1, $2, $3, $4, $5) RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async read() {
    let SQL = `SELECT * FROM users`;
    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async delete(data) {
    let VALUES = [data.id];
    let SQL = `DELETE FROM users WHERE id = $1`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async update(data) {
    let VALUES = [data.username, data.role_name, data.password, data.email, data.name, data.id];
    let SQL = `UPDATE users SET username =$1, role_name=$2, password=$3, email=$4, name = $5 WHERE id = $6 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new User();
