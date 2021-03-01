'use strict';

const express = require('express');
const router = express.Router();
const basicmid = require('../middleware/basic');
const oauth = require('../middleware/oauth');
const bearerMiddleware = require('../middleware/bearer-auth');
const authorizeMid = require('../middleware/authorize');
const roles = require('../model/role-model');
const users = require('../model/users-model');
const errorHandler = require('../middleware/500');
const logger = require('../model/log-model');

router.get('/', (request, response) => {
  response.json({
    info: 'Main route :)',
  });
});

router.post(
  '/roles',
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
  '/roles',
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
  '/roles',
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
  '/roles',
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
  '/users/approve/all',
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
      let id = req.params.id;
      let role_name = req.body.role_name;
      let rows = await users.approveUser({id, role_name});
      res.status(200).json(rows);
    } catch (err) {
      errorHandler(err);
    }
  }
);

router.post(
  '/signup',
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
      let permissions  = await roles.get(req.user[0].role_name);
      res.status(201).send({token: req.token, user: req.user, permissions: permissions[0].permission});
    }
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/signout', bearerMiddleware, (req, res) => {
  try {
    req.token = '';
    res.clearCookie('token');
    res.redirect('/');
  } catch (err) {
    errorHandler(err);
  }
});

router.get(
  '/users',
  bearerMiddleware,
  authorizeMid('approve'),
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
  '/users',
  bearerMiddleware,
  authorizeMid('approve'),
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
  '/users',
  bearerMiddleware,
  authorizeMid('approve'),
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

router.get('/log', bearerMiddleware, authorizeMid('read'), async (req, res) => {
  try {
    let rows = await logger.read();
    console.log(rows);
    res.status(200).json({ Log: rows });
  } catch (err) {
    errorHandler(err);
  }
});

router.get('/oauth', oauth, async(req, res) => {
  try {
    if (req.token) {
      res.set('token', req.token);
      res.cookie('token', req.token);
      let permissions  = await roles.get(req.user[0].role_name);
      res.status(201).send({token: req.token, user: req.user, permissions: permissions[0].permission});
    }
    else{
      res.status(201).json(req.user);    
    }
  } catch (err) {
    errorHandler(err);
  }
});

module.exports = router;
