var expect = require('expect');

var {generateMessage} = require('./message');

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