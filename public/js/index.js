//was inline javascript
var socket = io(); //which creates a connection

socket.on('connect', function () {
    console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'David',
    //     text: 'Yup. That works for me.'
    // });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>'); //use jQuery to create an element and then add it to the DOM
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// whilst building the app
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// });

// whilst building the app
// socket.emit('createMessage', {
//     from: 'Frank',
//     text: 'Hi'
// }, function (data) { //to add an acknowledgement to the client
//     console.log('Got it', data);
// });

socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My Current Location</a>'); //the anchor tag

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    jQuery('#messages').append(li);    
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function() {

    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() { //this is a click listener
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        socket.emit('createLocationMessage', { //emit a message to the server
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        alert('Unable to fetch location.');
    });
});