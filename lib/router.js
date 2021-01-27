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

router.get('/', async (request, response) => {
  let data = await roles.read();
  response.json({
    info: 'Main route :)',
    data: data
  });
});

router.post(
  '/roles/create',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await roles.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/roles/read',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let rows = await roles.read();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.put(
  '/roles/update',
  bearerMiddleware,
  authorizeMid('update'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await roles.update(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.delete(
  '/roles/delete',
  bearerMiddleware,
  authorizeMid('delete'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await roles.delete(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get(
  '/users/approve',
  bearerMiddleware,
  authorizeMid('approve'),
  async (req, res) => {
    try {
      let rows = await users.getNonApproved();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);
router.post(
  '/users/approve/:id',
  bearerMiddleware,
  authorizeMid('approve'),
  async (req, res) => {
    try {
      let data = req.params.id;
      let rows = await users.approveUser(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.post(
  '/users/create',
  bearerMiddleware,
  authorizeMid('create'),
  async (req, res) => {
    try {
      let data = req.body;
      console.log('data:>>>>>', data);
      let rows = await users.create(data);
      res.status(201).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.post('/signin', basicmid, async (req, res) => {
  try {
    if (req.token) {
      res.set('token', req.token);
      res.cookie('token', req.token);
      res.status(201).send(req.token);
    }
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/logout',  bearerMiddleware,(req, res)=>{
  try {
    req.token = '';
    res.clearCookie('token')
    res.redirect('/')
  } catch (err) {
    errorHandler(err);
  }
})

router.get(
  '/users/read',
  bearerMiddleware,
  authorizeMid('read'),
  async (req, res) => {
    try {
      let rows = await users.read();
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.put(
  '/users/update',
  bearerMiddleware,
  authorizeMid('update'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await users.update(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.delete(
  '/users/delete',
  bearerMiddleware,
  authorizeMid('delete'),
  async (req, res) => {
    try {
      let data = req.body;
      let rows = await users.delete(data);
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.get('/oauth', oauth, (req, res) => {
  res.status(201).json({ User: req.user, Token: req.token });
});

module.exports = router;

// router.param('model', getModel);

// router.post('/:model/create',createNew);
// router.get('/:model/read',getall);
// router.put('/:model/update',updateOne);
// router.delete('/:model/delete',deleteOne);

// function getModel(req, res, next) {
//   let model = req.params.model;
//   switch (model) {
//     case "Laptops":
//       req.model = Laptop;
//       next();
//       break;
//     case "roles":
//       req.model = roles;
//       next();
//       break;
//     case "users":
//       req.model = users;
//       next();
//       break;
//     case "programs":
//       req.model = Program;
//       next();
//       break;
//     case "programs_req":
//       req.model = Program;
//       next();
//       break;

//     default:
//       res.status(404).send('invalid route');
//       break;
//   }
// }
// async function createNew(req,res){
//   try {
//     let data = req.body;
//     let { rows } = await req.model.create(data);
//     res.status(201).json(rows);
//   } catch (err) {
//     errorHandler(err);
//   }
// };

// async function getall(req,res,){
//   try {
//     let rows = await req.model.read();
//     res.status(200).json(rows);
//   } catch (err) {
//     errorHandler(err);
//   }
// };
// async function updateOne(req,res){
//   try {
//     let data = req.body;
//     let rows = await req.model.update(data);
//     res.status(200).json(rows);
//   } catch (err) {
//     errorHandler(err);
//   }
// };
// async function deleteOne(req,res){
//   try {
//     let data = req.body;
//     let rows = await req.model.delete(data);
//     res.status(200).json(rows);
//   } catch (err) {
//     errorHandler(err);
//   }
// };
