//was inline javascript
var socket = io(); //which creates a connection

socket.on('connect', function () {
    console.log('Connected to server');

    socket.emit('createMessage', {
        from: 'David',
        text: 'Yup. That works for me.'
    });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
});