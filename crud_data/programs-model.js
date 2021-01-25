'use strict';
let pool = require('../pool');
let errorHandler = require('../middleware/500');
class Programs {
    constructor() {
        // this.program_name = name;
        // this.program_id = id;
        // this.program_version = version;
        // this.department = department;
    }

    async create(data) {
        let VALUES = [data.name,data.id,data.version,data.department,data.is_active];
        let SQL = `INSERT INTO programs (name,id,version,department,is_active) VALUES($1,$2,$3,$4,$5) RETURNING *`;
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
      let VALUES = [data.name,data.version,data.department,data.is_active,data.id];
      let SQL = `UPDATE programs SET name = $1, version = $2 , department = $3 ,is_active = $4 WHERE id = $5 RETURNING *`;
      try {
        let { rows } = await pool.query(SQL, VALUES);
        return rows;
      } catch (err) {
        errorHandler(err);
      }
    }
}

module.exports=new Programs;