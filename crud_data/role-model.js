'use strict';

class Role {
  constructor() {}
  create() {
    return `INSERT INTO roles(name) VALUES($1) RETURNING *`;
  }
  read() {
    return `SELECT * FROM roles`;
  }
  delete() {
    return `DELETE FROM roles WHERE id = $1`;
  }
  update() {
  return `UPDATE roles SET name = $1 WHERE id = $2 RETURNING *`;
  }
}

module.exports = new Role();
