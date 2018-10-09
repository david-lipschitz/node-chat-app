//was inline javascript
// eslint-disable-next-line
var socket = io(); //which creates a connection

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages'); // a jQuery selector call for all elements with an id of messages
    var newMessage = messages.children('li:last-child');
    // Heights
    var clientHeight = messages.prop('clientHeight'); // prop method to work across browsers
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    //var newMessageHeight = newMessage.$(selector).innerHeight(); //VS Code created $..
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    //if the user is near the bottom, scroll to the bottom, otherwise, leave the user where he is because he might be looking for something higher up
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        //console.log('Should scroll');
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
    // console.log('Connected to server');

    // socket.emit('createMessage', {
    //     from: 'David',
    //     text: 'Yup. That works for me.'
    // });

    var params = jQuery.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'; //redirect back to root page
        } else {
            console.log('No error');
        }
    }); //emitted by the client and listened by the server
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    //console.log('newMessage', message);
    // eslint-disable-next-line
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = jQuery('<li></li>'); //use jQuery to create an element and then add it to the DOM
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);

    //render this in #message-template in index.html!!
    var template = jQuery('#message-template').html();
    // eslint-disable-next-line
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
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
    //console.log('dl', message.url);
    // eslint-disable-next-line
    var formattedTime = moment(message.createdAt).format('h:mm a');

    //this was before Mustache
    //var li = jQuery('<li></li>');
    //var a = jQuery('<a target="_blank">My Current Location</a>'); //the anchor tag
    //li.text(`${message.from} ${formattedTime}: `);
    //a.attr('href', message.url);
    //li.append(a);
    //jQuery('#messages').append(li);    

    //this is using Mustache
    //render this in #message-template in index.html!!
    var template = jQuery('#location-message-template').html(); //.html gets its innerhtml back
    // eslint-disable-next-line
    var html = Mustache.render(template, { //template and the data you want to render into it
        url: message.url,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
});

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function() {
        messageTextbox.val('');
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function() { //this is a click listener
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }

    //locationButton.attr('disabled', 'disabled'); //change the disabled attribute on the button
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function (position) {
        //console.log(position);
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', { //emit a message to the server
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});