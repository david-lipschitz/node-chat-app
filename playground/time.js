var moment = require('moment');

// Jan 1st 1970 00:00:00 am which has Timestamp 0
// -1000 is 1 second in the past; ms: milliseconds

// var date = new Date();
// console.log(date.getMonth());

var date = moment();

//date.add(10, 'year').subtract(11, 'months');
//date.add(15, 'hour');

console.log(date.format('Do MMM YYYY h:mm a'));