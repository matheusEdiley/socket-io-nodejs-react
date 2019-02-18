const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

// our localhost port
const port = 5001;

const app = express();

// our server instance
const server = http.createServer(app);

// This creates our socket using the instance of the server
const io = socketIO(server);

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log(`New client connected id: ${socket.id}`);
  
  // just like on the client side, we have a socket.on method that takes a callback function
  socket.on('msg', (msg) => {
   
    console.log('Message Changed to: ', msg);
    io.sockets.emit('msg', msg);
  })
  
  // disconnect is fired when a client leaves the server
  socket.on('disconnect', () => {
    console.log(`user disconnected id: ${socket.id}`);
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));