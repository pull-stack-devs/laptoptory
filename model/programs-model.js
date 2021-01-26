'use strict';
let pool = require('../pool');
let errorHandler = require('../middleware/500');
class Programs {
  constructor() {}

  async create(data) {
    let VALUES = [data.name, data.version, data.department, data.is_active];
    let SQL = `INSERT INTO programs (name, version, department, is_active) VALUES($1, $2, $3, $4) RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async read() {
    let SQL = `SELECT * FROM programs`;
    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async update(data) {
    let VALUES = [
      data.name,
      data.version,
      data.department,
      data.is_active,
      data.id,
    ];
    let SQL = `UPDATE programs SET name = $1, version = $2 , department = $3 ,is_active = $4 WHERE id = $5 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async delete(data) {
    let VALUES = [data.id];
    let SQL = `DELETE FROM programs WHERE id = $1`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async readByConditon(obj) {
    let SQL = `SELECT * FROM programs WHERE ${obj.key} = $1`;
    console.log(SQL);
    console.log(obj);
    try {
      let { rows } = await pool.query(SQL, [obj.value]);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Programs();
