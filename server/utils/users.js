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
    removeUser (id) {
        // return user that was removed
        //var thisUser = this.users.filter((user) => user.id === id)[0]; 
        var thisUser = this.getUser(id); //this is the same as the previous line
        this.users = this.users.filter((user) => user.id !== id);
        return thisUser;
    }
    getUser (id) { //id is a string
        // find a user object by id returning the user object
        // get the first element of the array, which will be the only element found by the filter
        return this.users.filter((user) => user.id === id)[0]; 
    }
    getUserList (room) {
        // look through all the users finding the people in the room
        // eg ['Mike', 'Jen', 'Jody']
        // var users = this.users.filter((user) => {
        //     return user.room === room;
        // });
        // the next line has the same functionality as the previous three lines
        var users = this.users.filter((user) => user.room === room);
        // var namesArray = users.map((user) => { //map lets us use the property we want instead
        //     return user.name;
        // });
        var namesArray = users.map((user) => user.name);

        return namesArray;
    }
}

module.exports = {Users};