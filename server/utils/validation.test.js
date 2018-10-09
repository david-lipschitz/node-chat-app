const expect = require('expect');

const {isRealString} = require('./validation');

// eslint-disable-next-line
describe('isRealString', () => {
    // eslint-disable-next-line
    it('should reject non-string values', () => {

        var res = isRealString(98);

        expect(typeof res).toBe('boolean');
        expect(res).toBeFalsy();
    });

    // eslint-disable-next-line
    it('should reject string with only spaces', () => {
        var res = isRealString('    ');
        expect(res).toBeFalsy();
    });

    // eslint-disable-next-line
    it('should allow string with non-space characters', () => {
        var res = isRealString('  Andrew  ');
        expect(res).toBeTruthy();
    });

});

