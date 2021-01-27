'use strict';

let pool = require('../pool');
let errorHandler = require('../middleware/500');
//const client = new pg.Client('postgres://localhost:5432/inventory_app');

class Laptop {
  constructor() {}

  async create(data) {
    let SQL = `INSERT INTO laptops (serial_no, brand, cpu, ram, storage, storage_type, power_cable, display_resolution, model, availability) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
    let VALUES = [
      data.serial_no,
      data.brand,
      data.cpu,
      data.ram,
      data.storage,
      data.storage_type,
      data.power_cable,
      data.display_resolution,
      data.model,
      data.availability,
    ];
    try {
      let {rows} = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async read() {
    let SQL = `SELECT * FROM laptops`;
    try {
      let { rows } = await pool.query(SQL);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async delete(id) {
    let SQL = `DELETE FROM laptops WHERE id = $1`;
    try {
      let { rows } = await pool.query(SQL, [id]);
      console.log(rows);
      return `Item ${id} is deleted`;
    } catch (err) {
      errorHandler(err);
    }
  }

  async update(data) {
    let SQL = `UPDATE laptops SET serial_no= $1, brand=$2, cpu=$3, ram=$4, storage=$5, storage_type=$6, power_cable=$7, display_resolution=$8, model=$9, availability=$10 WHERE id = $11 RETURNING *`;
    let VALUES = [
      data.serial_no,
      data.brand,
      data.cpu,
      data.ram,
      data.storage,
      data.storage_type,
      data.charger,
      data.display_resolution,
      data.model,
      data.availability,
      data.id,
    ];

    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async readByConditon(obj) {
    let SQL = `SELECT * FROM laptops WHERE ${obj.key} = $1`;
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

  async readByRequirements(obj) {
    if (!obj) {
      return [];
    }
    let SQL = `SELECT * FROM laptops WHERE cpu = $1 AND ram = $2 AND storage = $3 AND storage_type = $4 AND display_resolution = $5`;
    console.log(SQL);
    console.log(obj);
    try {
      let { rows } = await pool.query(SQL, [
        obj.cpu,
        obj.ram,
        obj.storage_space,
        obj.storage_type,
        obj.display_resolution,
      ]);
      console.log(rows);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async updateAvailabilty(data) {
    let SQL = `UPDATE laptops SET availability = $2 WHERE serial_no= $1 RETURNING *`;
    try {
      let {rows} = await pool.query(SQL, [data[0], data[1]]);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Laptop();
