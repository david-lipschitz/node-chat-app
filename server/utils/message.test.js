var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
    it('should generate correct message object', () => {
        // no done required as this is a synchronous test
        // store result in variable
        // assert from matches the value you passed in
        // assert text match
        // asset createdAt is number (tobe)

        var from = 'David';
        var text = 'My message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'David';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';

        var message = generateLocationMessage(from, latitude, longitude);
        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});

    });
});