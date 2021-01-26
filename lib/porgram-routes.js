const express = require('express');
const router = express.Router();
const basicmid = require('../middleware/basic');
const oauth = require('../middleware/oauth');
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const notFoundHandler = require('../middleware/404');
const laptop = require('../model/laptop-model');
const programs = require('../model/programs-model');
const programReqs = require('../model/program-requirements-model');

router.post(
  '/programs/create',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      console.log(data);
      let rows = await programs.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/programs',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let rows = await programs.read();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.put(
  '/programs/update',
  bearerMiddleware,
  authorizeMid('update'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await programs.update(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.delete(
  '/programs/delete',
  bearerMiddleware,
  authorizeMid('delete'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await programs.delete(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

module.exports = router;
