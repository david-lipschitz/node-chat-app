require('./config/config');

const http = require('http'); // no NPM install required because path is built into npm 
const path = require('path'); // no NPM install required because path is built into npm
const express = require('express');
const socketIO = require('socket.io');
//const bodyParser = require('body-parser');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '/../public'); // so that we can use /server and /public from the server directory

// console.log(__dirname);
// console.log(__dirname + '/../public'); //this is the old way, but we can use path
// console.log(publicPath);

const port = process.env.PORT;
var app = express();
var server = http.createServer(app); // we are going to modify the way app works with the html library that we have loaded
var io = socketIO(server); //allows us to emit or listen to events
var users = new Users(); //allows us to call users and manipulate data

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
    //  this one without using the generateMessage function
    // socket.emit('newMessage', {
    //     from: 'Admin',
    //     text: 'Welcome to the chat app',
    //     createdAt: new Date().getTime()
    // });

    //  the rest using the generateMessage function
    //socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));

    // socket.broadcast.emit from Admin text New user joined
    //socket.broadcast.emit('newMessage', generateMessage('Admin','New user joined'));

    socket.on('join', (params, callback) => {
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required');
        }

        socket.join(params.room);
        users.removeUser(socket.id); //remove user from any existing rooms
        users.addUser(socket.id, params.name, params.room);

        // emit an event to everyone about the new user
        io.to(params.room).emit('updateUserList', users.getUserList(params.room)); // see chat.js for updateUserList

        //socket.leave('The Office Fans');

        //how to target specific users
        // io.emit emits to every user
        // socket.broadcast.emit sends message to everyone except for the current user
        // socket.emit emits an event to one user

        // io.emit -> io.to('The Office Fans').emit
        // socket.broadcast.emit -> socket.broadcast.to('The Office Fans').emit
        // socket.emit 

        socket.emit('newMessage', generateMessage('Admin','Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined.`));

        callback();
    });

    //this is the createMessage listener
    socket.on('createMessage', (message, callback) => {
        //console.log('createMessage', message);
        var user = users.getUser(socket.id);
        if (user && isRealString(message.text)) {
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        //io.emit emits an event to every single connection
        //io.emit('newMessage', generateMessage(message.from, message.text)); - this goes to everyone
        //callback('This is from the server.'); //using acknowledgements
        callback();
        // Broadcast: and list who gets or doesn't get a message
        //  for the next line, everyone gets it except us (the sender)
        // socket.broadcast.emit('newMessage', {
        //     from: message.from,
        //     text: message.text,
        //     createdAt: new Date().getTime()
        // });
    });

    //take the message received and send it to all the clients
    // socket.on('createLocationMessage', (coords) => {
    //     io.emit('newMessage', generateMessage('Admin', `${coords.latitude}, ${coords.longitude}`));
    // });
    // http://www.google.com/maps?q=-33.787904,18.4623104
    socket.on('createLocationMessage', (coords) => {
        //io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));  - our original createLocationMessage

        var user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }

    });
    
    socket.on('disconnect', () => {
        //console.log('User was disconnected');
        var user = users.removeUser(socket.id);
        if (user) { //if user was removed
            io.to(user.room).emit('updateUserList', users.getUserList(user.room)); //update the user list
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`)); //update a message: emit a message from Admin to everyone
        }
    });
});

//was app.listen... and it became server.listen...
// and try http://localhost:3000/socket.io/socket.io.js
server.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {app};
