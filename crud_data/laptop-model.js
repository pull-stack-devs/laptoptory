'use strict';

let pool = require('../pool');
let errorHandler = require('../middleware/500');
//const client = new pg.Client('postgres://localhost:5432/inventory_app');

class Laptop {
  constructor() {}

  async create(data) {
    let SQL = `INSERT INTO laptops (id,serial_no, brand, cpu, ram, storage,storage_type,carry_case,external_mouse,power_cable,charger,display_resolution,model,availability) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *;`;
    let VALUES = [
      data.id,
      data.serial_no,
      data.brand,
      data.cpu,
      data.ram,
      data.storage,
      data.storage_type,
      data.carry_case,
      data.external_mouse,
      data.power_cable,
      data.charger,
      data.display_resolution,
      data.model,
      data.availability,
    ];
    try {
      let newLaptop = await pool.query(SQL, VALUES);
      return newLaptop;
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

  async change(data) {
    let SQL = `UPDATE laptops SET id=$1, serial_no=$2, brand=$3, cpu=$4, ram=$5, storage=$6, storage_type=$7, carry_case=$8, external_mouse=$9, power_cable=$10, charger=$11, display_resolution=$12, model=$13, availability=$14 WHERE id = $1 RETURNING *`;
    let VALUES = [
      data.id,
      data.serial_no,
      data.brand,
      data.cpu,
      data.ram,
      data.storage,
      data.storage_type,
      data.carry_case,
      data.external_mouse,
      data.power_cable,
      data.charger,
      data.display_resolution,
      data.model,
      data.availability,
    ];

    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
}

module.exports = new Laptop();
