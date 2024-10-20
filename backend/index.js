// index.js
const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');


// Create an express app
const app = express();
app.use(cors());


// Create an HTTP server
const server = http.createServer(app);


// Create a Socket.IO server attached to the HTTP server
const io = new Server(server, {
    cors: {
        origin : "http://localhost:3000", // Client
        methods : ["GET", "POST"],
    },
});


// Listen for incoming socket connections
io.on('connection', (socket)=>{
    console.log("User ",socket.id, " is connected...");
    // Listen for chat messages from clients
    socket.on('send_message', (data) =>{
        // Broadcast the message to all connected users
        io.emit('receive_message', data);
    });
    // Handle user disconnect
    socket.on('disconnected', ()=>{
        console.log("User ", socket.id, " is disconnected.");
    });
});


// Start the server
server.listen(4000, ()=>{
    console.log("Listening on port 4000...");
});

