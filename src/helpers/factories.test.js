import { GameFactory as gf, getRandGameData } from './factories';
import { toBeOneOf, toBeInteger, toBePositive, toBeString, toBeWithin } from 'jest-extended';

expect.extend({ toBeOneOf, toBeInteger,toBePositive, toBeString, toBeWithin });
// TODO: Refactor these tests to use test.each instead to be less repetitive and more readable
// https://blog.theodo.com/2018/09/jest-each-tests/
describe('GameFactory', () => {
    describe('map_id', () => {
        test('integer > 0 => SUCCESS', () => {
            expect(gf({ map_id: 1 })).toMatchObject({ map_id: 1 });
        });
        test('decimal > 0 => ERR', () => {
            expect(() => gf({ map_id: 1.1 })).toThrow();
        });
        test('0 => ERR', () => {
            expect(() => gf({ map_id: 0 })).toThrow();
        });
        test('integer < 0 => ERR', () => {
            expect(() => gf({ map_id: -1 })).toThrow();
        });
        test('decimal < 0 => ERR', () => {
            expect(() => gf({ map_id: -1.1 })).toThrow();
        });
    });
    describe('username', () => {
        test('PASS undefined => SUCCESS', () => {
            expect(gf()).toMatchObject({ username: '' });
        });
        test('PASS blank string => SUCCESS', () => {
            expect(gf({ username: '' })).toMatchObject({ username: '' })
        })
        test('PASS non-blank string => SUCCESS', () => {
            expect(gf({ username: 'spam' })).toMatchObject({ username: 'spam' })
        });
        test('PASS positive integer => SUCCESS', () => {
            expect(gf({ username: 1 })).toMatchObject({ username: '1' });
        });
        test('PASS negative integer => SUCCESS', () => {
            expect(gf({ username: -1 })).toMatchObject({ username: '-1' });
        });
        test('PASS positive decimal => SUCCESS', () => {
            expect(gf({ username: 1.1 })).toMatchObject({ username: '1.1' });
        });
        test('PASS negative decimal => SUCCESS', () => {
            expect(gf({ username: -1.1 })).toMatchObject({ username: '-1.1' });
        });
        test('PASS symbols => SUCCESS', () => {
            expect(gf({ username: '!@#$%^&*+=-?`' })).toMatchObject({ username: '!@#$%^&*+=-?`' })
        });
    });
    describe('duration', () => {
        test('PASS undefined => SUCCESS', () => {
            expect(gf()).toMatchObject({ duration: 0 })
        });
        test('PASS 0 => SUCCESS', () => {
            expect(gf({ duration: 0 })).toMatchObject({ duration: 0 })
        });
        test('PASS positive integer => SUCCESS', () => {
            expect(gf({ duration: 1 })).toMatchObject({ duration: 1 })
        });
        test('PASS positive decimal => SUCCESS', () => {
            expect(() => gf({ duration: 1.1 })).toThrow()
        });
        test('PASS negative integer => SUCCESS', () => {
            expect(() => gf({ duration: -1 })).toThrow()
        });
        test('PASS negative decimal => SUCCESS', () => {
            expect(() => gf({ duration: -1.1 })).toThrow()
        });
    });
});

describe('getRandGameData', () => {
    var rgd;
    var map_id, username, duration;

    beforeAll(() => {
        rgd = getRandGameData();
        ({ map_id, username, duration} = rgd);
    })
    describe('properties', () => {
        test('HAS map_id', () => {
            expect(rgd).toHaveProperty('map_id');
        });
        test('HAS username', () => {
            expect(rgd).toHaveProperty('username');
        });
        test('HAS duration', () => {
            expect(rgd).toHaveProperty('duration');
        });
    });
    describe('data types', () => {
        test('RETURNED map_id IS integer', () => {
            expect(map_id).toBeInteger();
        });
        test('RETURNED username IS string', () => {
            expect(username).toBeString();
        });
        test('RETURNED duration IS integer', () => {
            expect(duration).toBeInteger();
        });
    });
    describe('values', () => {
        test('VALUE map_id EITHER 0 or 1', () => {
            expect(map_id).toBeOneOf([0, 1]);
        });
        // no value testing needed for 'username' - can be any string
        test('VALUE duration BETWEEN 0 and 90', () => {
            expect(duration).toBeWithin(0, 90);
        });
    });
});