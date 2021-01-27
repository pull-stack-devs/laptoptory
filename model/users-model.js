'use strict';

require('dotenv').config();
let pool = require('../pool');
let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');
let errorHandler = require('../middleware/500');

class User {
  constructor() {}
  async create(data) {
    console.log('inside create');
    let hasedPass = await bcrypt.hash(data.password, 10);
    let is_accepted = false
    let VALUES = [
      data.username,
      data.role_name,
      hasedPass,
      data.email,
      data.name,
      is_accepted
    ];
    console.log(VALUES);
    let SQL = `INSERT INTO users(username, role_name, password, email, name, is_accepted) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      console.log(rows);
      return rows;
    } catch (err) {
      console.log('Error>>>>', err);
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

  async get(username) {
    let SQL = `SELECT * FROM users WHERE username = $1`;
    try {
      let { rows } = await pool.query(SQL, [username]);
      return rows;
    } catch (err) {
      console.log('the error', err);
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
    let VALUES = [
      data.username,
      data.role_name,
      data.password,
      data.email,
      data.name,
      data.id,
    ];
    let SQL = `UPDATE users SET username =$1, role_name=$2, password=$3, email=$4, name = $5 WHERE id = $6 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, VALUES);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async getNonApproved() {
    let SQL = `SELECT * FROM users WHERE is_accepted = false`;
    try {
      let { rows } = await pool.query(SQL);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }
  async approveUser(id) {
    let SQL = `UPDATE users SET is_accepted = $1 WHERE id = $2 RETURNING *`;
    try {
      let { rows } = await pool.query(SQL, [true, id]);
      return rows;
    } catch (err) {
      errorHandler(err);
    }
  }

  async authenticate(data) {
    let sql = `SELECT * FROM users WHERE username = $1`;
    let values = [data.username];
    try {
      let { rows } = await pool.query(sql, values);
      if (rows) {
        let auth = bcrypt.compare(data.password, rows[0].password);
        if (auth) return rows;
        else return false;
      }
    } catch (err) {
      errorHandler(err);
    }
  }

  generateToken(data) {
    let token = jwt.sign(
      {
        username: data.username,
        password: data.password,
        role_name: data.role,
      },
      'anything'
    );
    return token;
  }

  async authenticateToken(token, secret) {
    console.log(secret);
    console.log(token);
    let tokenObject = await jwt.verify(token, secret);
    // console.log(tokenObject);
    console.log('tokenObject : ', tokenObject);
    //let checkUserExist = await this.get({ username: tokenObject.username });
    return tokenObject;
  }
}

module.exports = new User();
