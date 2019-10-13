const express = require('express');
const socket = require('socket.io');

//app set up
const app = express();

//server set up
let server = app.listen(4000, (err, data) => {
    if (err) throw err;
    console.log('listening to requests on port 4000');
});

//static files
app.use(express.static('public'));

//socket setup
let io = socket(server);

//calls function when connection is established
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id);

    //listens to client sent message
    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        //broadcasts to every other client excpet for the original one
        socket.broadcast.emit('typing', data);
    });

});



