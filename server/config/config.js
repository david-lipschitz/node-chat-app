var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    //when you fetch a json file it parses it automatically into a JavaScript object
    var config = require('./config.json'); //and this is not checked into GIT!!
    var envConfig = config[env];

    //Object.keys(envConfig) //gets all the keys and returns them as an array
    // and sets up process.env.PORT and process.env.MONGODB_URI and process.env.JWT_SECRET
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key];
    });
}
