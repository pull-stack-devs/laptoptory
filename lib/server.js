'use strict';
/*
const express = require('express');

const app = express();
const superagent = require('superagent');
const pg = require('pg');
// const methodOverride = require('method-override');

// App setup
require('dotenv').config();
const PORT = process.env.PORT;
// app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(methodOverride('_method'));
// app.use(express.static('./public'));
// app.set('view engine', 'ejs');
const client = new pg.Client(process.env.DATABASE_URL);
const Laptop = require('./crud_data/laptop-model');
const Role = require('./crud_data/role-model');
const Users = require('./crud_data/users-model');

app.post('/laptop', async (req, res) => {
  let data = req.body;
  // console.log(data)
  let arr = await Laptop.create(data);
  client
    .query(arr[0], arr[1])
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/searchLaptop', async (req, res) => {
  let data = req.body;
  let result = await Laptop.read(data);
  client
    .query(result[0], result[1])
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.put('/changeLaptop/:id', async (req, res) => {
  let id = req.params.id;
  let data = req.body;
  let result = await Laptop.change(data, id);
  client
    .query(result[0], result[1])
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/roles/create', (req, res) => {
  let data = req.body;
  client
    .query(Role.create(), [data.name])
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.get('/roles', (req, res) => {
  client
    .query(Role.read())
    .then((data) => {
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.put('/roles/update', (req, res) => {
  let data = req.body;
  client
    .query(Role.update(), [data.name, data.id])
    .then((data) => {
      console.log(data);
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.delete('/roles/delete', (req, res) => {
  client
    .query(Role.delete(), [req.body.id])
    .then((data) => {
      console.log(data);
      res.status(200).json(data.rows);
    })
    .catch((err) => {
      console.error(err);
    });
});

app.post('/users/create', (req, res) => {
    let data = req.body;
    client
      .query(Users.create(), [data.username, data.role_name, data.password, data.email, data.name])
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  
  app.get('/users', (req, res) => {
    client
      .query(Users.read())
      .then((data) => {
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  
  app.put('/users/update', (req, res) => {
    let data = req.body;
    client
      .query(Users.update(), [data.username, data.role_name, data.password, data.email, data.name, data.id])
      .then((data) => {
        console.log(data);
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });
  
  app.delete('/users/delete', (req, res) => {
    client
      .query(Users.delete(), [req.body.id])
      .then((data) => {
        console.log(data);
        res.status(200).json(data.rows);
      })
      .catch((err) => {
        console.error(err);
      });
  });


client.connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
});
*/