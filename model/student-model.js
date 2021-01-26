'use strict';

let pool = require('../pool');
let errorHandler = require('../middleware/500');

class Student {
  constructor() {}
  async create(data) {
    let VALUES = [
      data.name,
      data.nationality,
      data.national_id,
      data.student_status,
      data.program_name,
      data.program_version,
    ];
    let SQL = `INSERT INTO student(name, nationality, national_id, student_status, program_name, program_version) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async read() {
    let SQL = `SELECT * FROM student`;
    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async delete(data) {
    let VALUES = [data.id];
    let SQL = `DELETE FROM student WHERE id = $1`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async update(data) {
    let VALUES = [
      data.name,
      data.nationality,
      data.national_id,
      data.student_status,
      data.program_name,
      data.program_version,
      data.id,
    ];
    let SQL = `UPDATE student SET name =$1, nationality=$2, national_id=$3, student_status=$4, program_name = $5, program_version = $6  WHERE id = $7 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async readByConditon(obj) {
    let SQL = `SELECT * FROM student WHERE ${obj.key} = $1`;
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

  async readByProgram(obj) {
    let SQL = `SELECT * FROM student WHERE ${obj[0].key} = $1 AND  ${obj[1].key} = $2`;
    console.log(SQL);
    console.log(obj);
    try {
      let { rows } = await pool.query(SQL, [obj[0].value, obj[1].value]);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Student();
