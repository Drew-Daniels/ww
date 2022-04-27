import { GameFactory as gf, getRandGameData } from './factories';
import { toBeOneOf, toBeInteger, toBePositive, toBeString } from 'jest-extended';

expect.extend({ toBeOneOf, toBeInteger,toBePositive, toBeString });
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
            expect(gf({ is_complete: '1' })).toThrow();
        });
        test('PASS 0 as string => ERROR', () => {
            expect(gf({ is_complete: '0' })).toThrow();
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
    var randGameData;
    beforeAll(() => {
        randGameData = getRandGameData();
    })
    describe('properties', () => {
        test('HAS map_id', () => {
            expect(randGameData).toHaveProperty('map_id');
        });
        test('HAS username', () => {
            expect(randGameData).toHaveProperty('username');
        });
        test('HAS duration', () => {
            expect(randGameData).toHaveProperty('duration');
        });
        test('HAS is_complete', () => {
            expect(randGameData).toHaveProperty('is_complete');
        });
    });
    describe('data types', () => {
        test('RETURNED map_id === integer', () => {
            expect(randGameData.map_id).toBeInteger();
        });
        test('RETURNED username === string', () => {
            expect(randGameData.username).toBeString();
        });
        test('RETURNED duration ==== integer', () => {
            expect(randGameData.duration).toBeInteger();
        });
        test('RETURNED is_complete === integer', () => {
            expect(randGameData.is_complete).toBeInteger();
        });
    });
    describe('values', () => {
        test('VALUE is_complete === 0 or 1', () => {
            expect(randGameData.is_complete).toBeOneOf([0, 1]);
        });
    })
    it.todo('generates a map_id between 0 and 1', () => {
        
    });
    it.todo('generates a username as a string', () => {

    });
    it.todo('generates a duration between 0 and 90', () => {

    });
    it.todo('generates an is_complete value between 0 and 1', () => {

    });
});