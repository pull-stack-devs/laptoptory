const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const errorHandler = require('../middleware/500');
const notFoundHandler = require('../middleware/404');
const laptop = require('../model/laptop-model');
const program = require('../model/programs-model');
const programReqs = require('../model/program-requirements-model');

router.get(
  '/laptops/',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let rows = await laptop.read();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/laptops/search',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    if (req.query.availability) {
      let availabilityStatus = req.query.availability;
      try {
        let rows = await laptop.readByConditon({
          key: 'availability',
          value: availabilityStatus,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else if (req.query.brand) {
      let brand = req.query.brand;
      try {
        let rows = await laptop.readByConditon({
          key: 'brand',
          value: brand,
        });
        res.status(200).json(rows);
      } catch (err) {
        errorHandler(err);
      }
    } else if (req.query.program) {
      let prog = req.query.program;
      let programInfo = await program.readByConditon({
        key: 'id',
        value: prog,
      });

      let programRequirements = await programReqs.readByConditon([
        {
          key: 'program_name',
          value: programInfo[0].name,
        },
        {
          key: 'program_version',
          value: programInfo[0].version,
        },
      ]);

      let rows = await laptop.readByRequirements(programRequirements[0]);
      res.status(200).json(rows);
    } else {
      notFoundHandler();
    }
  }
);

router.post(
  '/laptops/',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await laptop.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.put(
  '/laptops/',
  bearerMiddleware,
  authorizeMid('update'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await laptop.update(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

module.exports = router;
