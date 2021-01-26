'use strict';

const express = require('express');
const router = express.Router();
const basicmid = require('../middleware/basic');
const oauth = require('../middleware/oauth');
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const Laptop = require('../crud_data/laptop-model');
const roles = require('../crud_data/role-model');
const users = require('../crud_data/users-model');
const errorHandler = require('../middleware/500');
const Program =require('../crud_data/programs-model');
const Program_req =require('../crud_data/program-requir-model');

router.get('/', (request, response) => {
  response.json({
    info: 'Node.js, Express, and Postgres API',
  });
});

router.post('/laptops/create', bearerMiddleware, authorizeMid('create'),async (req, res) => {
  try {
    let data = req.body;
    let { rows } = await Laptop.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/laptops/read', bearerMiddleware, authorizeMid('read'),async (req, res) => {
  try {
    let rows = await Laptop.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.put('/laptops/update', bearerMiddleware, authorizeMid('update'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await Laptop.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.post('/roles/create', bearerMiddleware, authorizeMid('create'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await roles.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/roles/read', bearerMiddleware, authorizeMid('read'),async (req, res) => {
  try {
    let rows = await roles.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.put('/roles/update', bearerMiddleware, authorizeMid('update'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await roles.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.delete('/roles/delete', bearerMiddleware, authorizeMid('delete'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await roles.delete(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.post('/users/create', bearerMiddleware, authorizeMid('create'),async (req, res) => {
  try {
    let data = req.body;
    console.log('data:>>>>>', data);
    let rows = await users.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.post('/signin', basicmid, async (req, res) =>{
  try{
    if(req.token) {
      res.status(201).send(req.token);
    }
  }catch (err) {
    errorHandler(err);
  }
})

router.get('/oauth', oauth, (req, res)=>{

})

router.get('/users/read', bearerMiddleware, authorizeMid('read'),async (req, res) => {
  try {
    let rows = await users.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.put('/users/update', bearerMiddleware, authorizeMid('update'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await users.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.delete('/users/delete', bearerMiddleware, authorizeMid('delete'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await users.delete(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

router.post('/programs/create', bearerMiddleware, authorizeMid('create'),async (req,res)=>{
  try {
    let data = req.body;
    console.log(data);
    let { rows } = await Program.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});
 router.get('/programs/read', bearerMiddleware, authorizeMid('read'),async(req,res)=>{
  try {
    let rows = await Program.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
 });
 router.put('/programs/update',bearerMiddleware, authorizeMid('update'),async(req,res)=>{
  try {
    let data = req.body;
    let rows = await Program.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});
router.post('/programs_req/create',bearerMiddleware, authorizeMid('create'),async (req,res)=>{
  try {
    let data = req.body;
    console.log(data);
    let { rows } = await Program_req.create(data);
    res.status(201).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});
 router.get('/programs_req/read',bearerMiddleware, authorizeMid('read'),async(req,res)=>{
  try {
    let rows = await Program_req.read();
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
 });
 router.put('/programs_req/update',bearerMiddleware, authorizeMid('update'),async(req,res)=>{
  try {
    let data = req.body;
    let rows = await Program_req.update(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});
router.delete('/programs_req/delete', bearerMiddleware, authorizeMid('delete'),async (req, res) => {
  try {
    let data = req.body;
    let rows = await Program_req.delete(data);
    res.status(200).json(rows);
  } catch (err) {
    errorHandler(err);
  }
});

module.exports = router;

