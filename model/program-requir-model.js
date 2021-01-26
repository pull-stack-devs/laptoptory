'use strict';
let pool = require('../pool');
let errorHandler = require('../middleware/500');
class Programs_req {
  constructor() {}

  async create(data) {
    console.log('inside create');
    let VALUES = [
      data.program_name,
      data.program_version,
      data.cpu,
      data.ram,
      data.display_resolution,
      data.storage_space,
      data.storage_type,
    ];

    console.log('Values', VALUES);
    let SQL = `INSERT INTO program_requirements (program_name, program_version, cpu, ram, display_resolution,storage_space, storage_type) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      console.log(err);
      errorHandler(err);
    }
  }
  async read() {
    let SQL = `SELECT * FROM program_requirements`;
    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async update(data) {
    let VALUES = [
      data.cpu,
      data.ram,
      data.display_resolution,
      data.storage_space,
      data.storage_type,
      data.program_id,
    ];
    let SQL = `UPDATE program_requirements SET cpu = $1, ram = $2 ,display_resolution = $3 ,storage_space = $4,storage_type = $5 WHERE program_id = $6 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async delete(data) {
    let VALUES = [data.program_id];
    let SQL = `DELETE FROM program_requirements WHERE program_id = $1`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Programs_req();
