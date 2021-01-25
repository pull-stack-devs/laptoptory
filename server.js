'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express();
app.use(express.json());
const Laptop = require('./crud_data/laptops');
const PORT = process.env.PORT;
const router = require('./lib/router');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);
app.use('*', notFoundHandler);
app.use(errorHandler);


app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});
