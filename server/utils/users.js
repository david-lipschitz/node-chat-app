//an array of objects with socket ids

// [{
//     id: 'adfsdf',
//     name: 'Andrew',
//     room: 'The Office fans'
// }]

// addUser(id,name,room)
// removeUser(id)
// getUser(id)
// getUserList(room) returns an array of names in the room

//var users = []; with addUser with users.push; but rather use ES6 classes

//if a function is meant to be used with a new then it should start with an uppercase, eg new Person
// the constructor function is called automatically

// Person done here for example
// class Person {
//     constructor (name, age) {
//         //console.log(name, age);
//         //this refers to the instance, not to the class
//         this.name = name;
//         this.age = age;
//     }
//     getUserDescription () {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('David', 54); // a new instance of the class
// //console.log('this.name', me.name);
// //console.log('this.age', me.age);
// var description = me.getUserDescription();
// console.log(description);

class Users {
    constructor () {
        this.users = [];
    }
    addUser (id, name, room) {
        var user = {id, name, room};
        this.users.push(user);
        return user;
    }
}

module.exports = {Users};