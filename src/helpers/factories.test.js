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
    describe('is_complete', () => {
        test('PASS undefined => SUCCESS', () => {
            expect(gf()).toMatchObject({ is_complete: false });
        });
        test('PASS true => SUCCESS', () => {
            expect(gf({ is_complete: true })).toMatchObject({ is_complete: true });
        });
        test('PASS false => SUCCESS', () => {
            expect(gf({ is_complete: false })).toMatchObject({ is_complete: false });
        });
        test('PASS 1 as number => SUCCESS', () => {
            expect(gf({ is_complete: 1 })).toMatchObject({ is_complete: true });
        });
        test('PASS 0 as number => SUCCESS', () => {
            expect(gf({ is_complete: 0 })).toMatchObject({ is_complete: false });
        });
        test('PASS 1 as string => ERROR', () => {
            expect(() => gf({ is_complete: '1' })).toThrow();
        });
        test('PASS 0 as string => ERROR', () => {
            expect(() => gf({ is_complete: '0' })).toThrow();
        });        
        test('PASS true as string => ERROR', () => {
            expect(() => gf({ is_complete: 'true' })).toThrow();
        });
        test('PASS false as string => ERROR', () => {
            expect(() => gf({ is_complete: 'false' })).toThrow();
        });
        test('PASS integer > 1  => ERROR', () => {
            expect(() => gf({ is_complete: 2 })).toThrow();
        });
        test('PASS integer < 0 => ERROR', () => {
            expect(() => gf({ is_complete: -1 })).toThrow();
        });
        test('PASS decimal > 1 => ERROR', () => {
            expect(() => gf({ is_complete: 1.1 })).toThrow();
        });
        test('PASS decimal < 0 => ERROR', () => {
            expect(() => gf({ is_complete: -.1 })).toThrow();
        });
    });
});

describe('getRandGameData', () => {
    var rgd;
    var map_id, username, duration, is_complete;

    beforeAll(() => {
        rgd = getRandGameData();
        ({ map_id, username, duration, is_complete } = rgd);
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
        test('HAS is_complete', () => {
            expect(rgd).toHaveProperty('is_complete');
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
        test('RETURNED is_complete IS integer', () => {
            expect(is_complete).toBeInteger();
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
        test('VALUE is_complete EITHER 0 and 1', () => {
            expect(is_complete).toBeOneOf([0, 1]);
        });
    });
});