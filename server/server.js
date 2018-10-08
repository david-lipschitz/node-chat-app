require('./config/config');

const http = require('http'); // no NPM install required because path is built into npm 
const path = require('path'); // no NPM install required because path is built into npm
const express = require('express');
const socketIO = require('socket.io');
//const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '/../public'); // so that we can use /server and /public from the server directory

// console.log(__dirname);
// console.log(__dirname + '/../public'); //this is the old way, but we can use path
// console.log(publicPath);

const port = process.env.PORT;
var app = express();
var server = http.createServer(app); // we are going to modify the way app works with the html library that we have loaded
var io = socketIO(server); //allows us to emit or listen to events

//app.use(bodyParser.json()); //the middleware we need to give to express
//app.use(express.static(__dirname + '/../public')); -- mine
app.use(express.static(publicPath)); //Andrew's version

//register an event listener: this first event is to listen to a connection
io.on('connection', (socket) => {
    console.log('New user connected');

    //whilst testing
    //socket.emit('newEmail'); //we don't have to specify parameters
    // socket.emit emits an event to a single connection
    // socket.emit('newMessage', {
    //     from: 'John',
    //     text: 'See you then',
    //     createAt: 123
    // });

    // socket.emit from Admin text Welcome to the chat app
    socket.emit('newMessage', {
        from: 'Admin',
        text: 'Welcome to the chat app',
        createdAt: new Date().getTime()
    });

    // socket.broadcast.emit from Admin text New user joined
    socket.broadcast.emit('newMessage', {
        from: 'Admin',
        text: 'New user joined',
        createdAt: new Date().getTime()
    });

    //this is the createMessage listener
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        //io.emit emits an event to every single connection
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
        // Broadcast: and list who gets or doesn't get a message
        //  for the next line, everyone gets it except us (the sender)
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
});

//was app.listen... and it became server.listen...
// and try http://localhost:3000/socket.io/socket.io.js
server.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {app};
