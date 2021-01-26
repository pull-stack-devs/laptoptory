const express = require('express');
const router = express.Router();
const basicmid = require('../middleware/basic');
const oauth = require('../middleware/oauth');
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const notFoundHandler = require('../middleware/404');
const laptop = require('../model/laptop-model');
const program = require('../model/programs-model');

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
  '/laptops/search?',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {

    if(req.query.availability){
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
    } else if(req.query.brand){
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
    } else if(req.query.program){
        let prog = req.query.program;
        let programReqs = program.readByConditon({
            key: 'name',
            value: prog,
          });
    } else{
        notFoundHandler();
    }


    
  }
);

router.post(
  '/laptops/create',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      let { rows } = await laptop.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.put(
  '/laptops/update',
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
