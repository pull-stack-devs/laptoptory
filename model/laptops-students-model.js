'use strict';

let pool = require('../pool');
let errorHandler = require('../middleware/500');

class StudentsLaptops {
  constructor() {}

  async assign(data) {
    let VALUES = [data.std_id, data.laptop_id, data.availability];
    let SQL = `INSERT INTO student_laptop (std_id, laptop_id, availability_student) VALUES($1, $2, $3) RETURNING *`;

    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async read() {
    let SQL = `SELECT * FROM student_laptop`;

    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async update(data) {
    let VALUES = [
      data.std_id,
      data.laptop_id,
      data.availability,
      data.id,
    ];
    let SQL = `UPDATE student_laptop SET std_id = $1, laptop_id = $2 , availability = $3 WHERE id = $4 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async delete(data) {
    let VALUES = [data.id];
    let SQL = `DELETE FROM student_laptop WHERE id = $1`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async readByConditon(obj) {
    let SQL = `SELECT * FROM student_laptop WHERE ${obj.key} = $1`;
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

  async joinLaptopStudent(){
    let SQL = `SELECT * FROM laptops LEFT OUTER JOIN student_laptop ON laptops.serial_no = studnet_laptop.laptop_id`;

    try {
      let { rows } = await pool.query(SQL);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  } 
}

module.exports = new StudentsLaptops();
