import { GameFactory as gf, getRandGameData } from './factories';
import { toBeOneOf, toBeInteger, toBePositive, toBeString } from 'jest-extended';

expect.extend({ toBeOneOf, toBeInteger,toBePositive, toBeString });
// TODO: Refactor these tests to use test.each instead to be less repetitive and more readable
// https://blog.theodo.com/2018/09/jest-each-tests/
describe('GameFactory', () => {
    describe('map_id', () => {
        it('accepts a positive integer', () => {
            expect(gf({ map_id: 1 })).toMatchObject({ map_id: 1 });
        });
        it('DOES not accept a positive decimal', () => {
            expect(() => gf({ map_id: 1.1 })).toThrow();
        });
        it('DOES not accept 0', () => {
            expect(() => gf({ map_id: 0 })).toThrow();
        });
        it('DOES not accept a negative integer', () => {
            expect(() => gf({ map_id: -1 })).toThrow();
        });
        it('DOES not accept a negative decimal', () => {
            expect(() => gf({ map_id: -1.1 })).toThrow();
        });
    });
    describe('username', () => {
        it('accepts undefined', () => {
            expect(gf()).toMatchObject({ username: '' });
        });
        it('accepts a blank string', () => {
            expect(gf({ username: '' })).toMatchObject({ username: '' })
        })
        it('accepts a non-blank string', () => {
            expect(gf({ username: 'spam' })).toMatchObject({ username: 'spam' })
        });
        it('accepts an integer', () => {
            expect(gf({ username: 1 })).toMatchObject({ username: '1' });
        });
        it('accepts a decimal', () => {
            expect(gf({ username: 1.1 })).toMatchObject({ username: '1.1' });
        });
        it('accepts symbols', () => {
            expect(gf({ username: '!@#$%^&*+=-?`' })).toMatchObject({ username: '!@#$%^&*+=-?`' })
        });
    });
    describe('duration', () => {
        it('accepts undefined', () => {
            expect(gf()).toMatchObject({ duration: 0 })
        });
        it('accepts 0', () => {
            expect(gf({ duration: 0 })).toMatchObject({ duration: 0 })
        });
        it('accepts a positive integer', () => {
            expect(gf({ duration: 1 })).toMatchObject({ duration: 1 })
        });
        it('does NOT accept a positive decimal', () => {
            expect(() => gf({ duration: 1.1 })).toThrow()
        });
        it('does NOT accept a negative integer', () => {
            expect(() => gf({ duration: -1 })).toThrow()
        });
        it('does NOT accept a negative decimal', () => {
            expect(() => gf({ duration: -1.1 })).toThrow()
        });
    });
    describe('is_complete', () => {
        it('accepts undefined', () => {
            expect(gf()).toMatchObject({ is_complete: false });
        });
        it('accepts true', () => {
            expect(gf({ is_complete: true })).toMatchObject({ is_complete: true });
        });
        it('accepts false', () => {
            expect(gf({ is_complete: false })).toMatchObject({ is_complete: false });
        });
        it('accepts 1', () => {
            expect(gf({ is_complete: 1 })).toMatchObject({ is_complete: true });
        });
        it('accepts 0', () => {
            expect(gf({ is_complete: 0 })).toMatchObject({ is_complete: false });
        });
        it('does NOT accept true as string', () => {
            expect(() => gf({ is_complete: 'true' })).toThrow();
        });
        it('does NOT accept false as string', () => {
            expect(() => gf({ is_complete: 'false' })).toThrow();
        });
        it('does NOT accept an integer greater than 1', () => {
            expect(() => gf({ is_complete: 2 })).toThrow();
        });
        it('does NOT accept an integer less than 0', () => {
            expect(() => gf({ is_complete: -1 })).toThrow();
        });
        it('does NOT accept a decimal greater than 1', () => {
            expect(() => gf({ is_complete: 1.1 })).toThrow();
        });
        it('does NOT accept a decimal less than 0', () => {
            expect(() => gf({ is_complete: -.1 })).toThrow();
        });
    });
});

describe('getRandGameData', () => {
    var randGameData;
    beforeAll(() => {
        randGameData = getRandGameData();
    })
    describe('properties', () => {
        it('map_id', () => {
            expect(randGameData).toHaveProperty('map_id');
        });
        it('username', () => {
            expect(randGameData).toHaveProperty('username');
        });
        it('duration', () => {
            expect(randGameData).toHaveProperty('duration');
        });
        it('is_complete', () => {
            expect(randGameData).toHaveProperty('is_complete');
        });
    });
    describe('data types', () => {
        it('map_id => integer', () => {
            expect(randGameData.map_id).toBeInteger();
        });
        it('username => string', () => {
            expect(randGameData.username).toBeString();
        });
        it('duration => integer', () => {
            expect(randGameData.duration).toBeInteger();
        });
        it('is_complete => integer', () => {
            expect(randGameData.is_complete).toBeInteger();
        });
    });
    describe('values', () => {
        it('is_complete => 0 or 1', () => {
            expect(randGameData.is_complete).toBeOneOf([0, 1]);
        });
    })
    it.todo('generates a map_id between 0 and 1');
    it.todo('generates a username as a string');
    it.todo('generates a duration between 0 and 90');
    it.todo('generates an is_complete value between 0 and 1')
});