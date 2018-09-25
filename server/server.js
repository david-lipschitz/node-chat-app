require('./config/config');

const path = require('path'); // no NPM install required because path is built into npm
const express = require('express');
const bodyParser = require('body-parser');

const publicPath = path.join(__dirname, '/../public'); // so that we can use /server and /public from the server directory

// console.log(__dirname);
// console.log(__dirname + '/../public'); //this is the old way, but we can use path
// console.log(publicPath);

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json()); //the middleware we need to give to express
//app.use(express.static(__dirname + '/../public')); -- mine
app.use(express.static(publicPath)); //Andrew's version

// app.get('/', function(req, res){
//     res.render('/index.html');
// });

app.listen(port, () => {
    console.log(`Started up on port ${port}`);
});

module.exports = {app};
