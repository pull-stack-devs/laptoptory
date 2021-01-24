'use strict';

class User {
  constructor() {}
  create() {
    return `INSERT INTO users(username, role_name, password, email, name) VALUES($1, $2, $3, $4, $5) RETURNING *`;
  }
  read() {
    return `SELECT * FROM users`;
  }
  delete() {
    return `DELETE FROM users WHERE id = $1`;
  }
  update() {
    return `UPDATE users SET username =$1, role_name=$2, password=$3, email=$4, name = $5 WHERE id = $6 RETURNING *`;
  }
}

module.exports = new User();