const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;


app.use(express.static(path.join(__dirname)));


io.on('connection', (socket) => {
    console.log('A user connected');


    socket.on('syncTime', (data) => {
        socket.broadcast.emit('syncTime', data);
    });

 
    socket.on('pauseVideo', () => {
        socket.broadcast.emit('pauseVideo');
    });

    socket.on('playVideo', () => {
        socket.broadcast.emit('playVideo'); // Broadcast the play event to other clients
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected');
    });
});

// Start the server
server.listen(PORT, () => {
    console.log('Server is running on http://localhost:${PORT}');
});
