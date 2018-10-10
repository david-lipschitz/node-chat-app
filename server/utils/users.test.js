const expect = require('expect');

const {Users} = require('./users');

// eslint-disable-next-line
describe('Users', () => {

    //create seed data
    var users; 
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }];
    });
    
    // eslint-disable-next-line
    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'David',
            room: 'The Office Fans'
        };
        // eslint-disable-next-line
        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var userId = '2';
        var user = users.removeUser(userId);
        //console.log(userList);
        //console.log(users);

        expect(user).toEqual( { id: '2', name: 'Jen', room: 'React Course' } );
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove a user', () => {
        //eg pass 44 as an id
        var userId = '44';
        var user = users.removeUser(userId);

        expect(user).toNotExist;
        expect(users.users.length).toBe(3);
    });

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId);
        //console.log(userList);

        expect(user).toEqual( { id: '2', name: 'Jen', room: 'React Course' } );
        expect(user.id).toBe(userId);
    });

    it('should not find user', () => {
        var user = users.getUser('44');
        //console.log(userList);

        expect(user).toEqual( undefined );
        expect(user).toNotExist; //this line same as previous line
    });

    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');

        expect(userList).toEqual(['Mike', 'Julie']);
    });

    it('should return names for react course', () => {
        var userList = users.getUserList('React Course');

        expect(userList).toEqual(['Jen']);
    });

});