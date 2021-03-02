'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
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
  notifications: {},
};
const socketIO = require('socket.io');
const io = socketIO(server);

server.listen(PORT);
server.on('listening', () => {
  console.log(`Listening on port:: http://localhost:${PORT}/`);
});

// app.listen(PORT, () => {
//   console.log(`App running on port ${PORT}.`);
// });

io.on('connection', (socket) => {
  console.log('socket: random');

  socket.on('superAdminLogin', (payload) => {
    socket.broadcast.emit('superAdminLogin', queue.notifications);
  });
  socket.on('notification', (payload) => {
    let id = Math.random();
    queue.notifications[id] = payload;
    // socket.broadcast.emit('notification', queue.notifications);
  });
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// socket.on('hello', payload=> {
//   console.log("queue server hello!");
//   let id = Math.random();
//   queue.hello[id] = payload;
//   socket.broadcast.emit('hello', {id, payload})    });

//   socket.on('received', message=> {
//     delete queue.hello[message.id];
//   });
