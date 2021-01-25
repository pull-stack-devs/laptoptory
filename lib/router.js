'use strict';

const express = require('express');
const router = express.Router();
const Laptop = require('../crud_data/laptop-model');
const roles = require('../crud_data/role-model');
const users = require('../crud_data/users-model');
const errorHandler = require('../middleware/500');

router.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API',
  });
});

router.post('/laptops/add', async (req, res) => {
  try {
    let data = req.body;
    let { rows } = await Laptop.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/laptops', async (req, res) => {
  try {
    let rows = await Laptop.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.put('/laptops/update', async (req, res) => {
  try {
    let data = req.body;
    let rows = await Laptop.change(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.post('/roles/create', async (req, res) => {
  try {
    let data = req.body;
    let rows = await roles.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/roles', async (req, res) => {
  try {
    let rows = await roles.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.put('/roles/update', async (req, res) => {
  try {
    let data = req.body;
    let rows = await roles.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.delete('/roles/delete', async (req, res) => {
  try {
    let data = req.body;
    let rows = await roles.delete(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.post('/users/create', async (req, res) => {
  try {
    let data = req.body;
    console.log('data:>>>>>', data);
    let rows = await users.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/users', async (req, res) => {
  try {
    let rows = await users.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.put('/users/update', async (req, res) => {
  try {
    let data = req.body;
    let rows = await users.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.delete('/users/delete', async (req, res) => {
  try {
    let data = req.body;
    let rows = await users.delete(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

module.exports = router;
