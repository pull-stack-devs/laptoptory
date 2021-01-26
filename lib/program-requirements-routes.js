'use strict';

const express = require('express');
const router = express.Router();
const basicmid = require('../middleware/basic');
const oauth = require('../middleware/oauth');
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const Laptop = require('../model/laptop-model');
const roles = require('../model/role-model');
const users = require('../model/users-model');
const errorHandler = require('../middleware/500');
const Program = require('../model/programs-model');
const Program_req = require('../model/program-requirements-model');


router.post(
    '/programs_req/create',
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
    '/programs_req/read',
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
    '/programs_req/update',
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
    '/programs_req/delete',
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
