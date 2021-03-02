'use strict';

const express = require('express');
const socketIO = require('socket.io');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const laptopRoutes = require('./lib/laptop-routes');
const programRoutes = require('./lib/porgram-routes');
const programRequirementsRoutes = require('./lib/program-requirements-routes');
const studentRoutes = require('./lib/studetn-routes');
const PORT = process.env.PORT;
const router = require('./lib/router');
const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');
const bearerMiddleware = require('./middleware/bearer-auth');
const authorizeMid = require('./middleware/authorize');

const mongoose = require('mongoose');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(router);
app.use(laptopRoutes);
app.use(programRoutes);
app.use(programRequirementsRoutes);
app.use(studentRoutes);
app.use('*', notFoundHandler);
app.use(errorHandler);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});


const queue = {
  notifications: {}
};

app.get(
  '/notifications/all',
  bearerMiddleware,
  authorizeMid('approve'),
  async (req, res) => {
    try {
      // let rows = await users.read();
      res.status(200).json(queue);
    } catch (err) {
      errorHandler(err);
    }
  }
);



app.listen(PORT, () => {
  console.log(`App running on port ${PORT}.`);
});

const io = socketIO(app);

io.on('connection', socket=> {
  console.log("socket: random")
  socket.on('signup', payload=> {
      console.log("New User signup!");
      let id = Math.random();
      queue.notifications[id] = payload;
      // socket.broadcast.emit('New user', {payload})
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    clearInterval(interval);
  });
});