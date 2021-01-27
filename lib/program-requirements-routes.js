'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const errorHandler = require('../middleware/500');
const Program_req = require('../model/program-requirements-model');

router.post(
  '/programs-requirements/',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await Program_req.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/programs-requirements',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let rows = await Program_req.read();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);
router.put(
  '/programs-requirements',
  bearerMiddleware,
  authorizeMid('update'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await Program_req.update(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);
router.delete(
  '/programs-requirements',
  bearerMiddleware,
  authorizeMid('delete'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await Program_req.delete(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

module.exports = router;
