const expect = require('expect');

const {Users} = require('./users');

// eslint-disable-next-line
describe('Users', () => {
    
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

});