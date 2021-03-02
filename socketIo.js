const socketIO = require('socket.io');
const server = require('./server');
const io = socketIO(server);

const queue = {
    notifications: {}
  };

io.on('connection', socket=> {
    console.log("socket: random");
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

  