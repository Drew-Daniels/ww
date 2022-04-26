import { UserFactory, GameFactory } from './factories';

describe('UserFactory tests', () => {
    describe('UserFactory id tests', () => {
        it('accepts an integer greater than 0 for id', () => {
            expect(UserFactory(1)).toMatchObject({ id: 1 });
        });
        it('does NOT accept a decimal for id', () => {
            expect(() => UserFactory(1.1)).toThrow();
        });
        it('does NOT accept a 0 for id', () => {
            expect(() => UserFactory(0)).toThrow();
        });
        it('does NOT accept a negative integer for id', () => {
            expect(() => UserFactory(-1)).toThrow();
        });
        it('does NOT accept no value being passed for id', () => {
            expect(() => UserFactory()).toThrow();
        });

    });
    describe('UserFactory name tests', () => {
        it('accepts no arguments passed for name', () => {
            expect(UserFactory(1)).toMatchObject({ name: '' });
        });
        it('accepts a blank string for name', () => {
            expect(UserFactory(1, '')).toMatchObject({ name: '' });
        });
        it('accepts a passed-in string for name', () => {
            expect(UserFactory(1, 'spam')).toMatchObject({ name: 'spam' });
        });
        it('accepts an integer for name', () => {
            expect(UserFactory(1, 1)).toMatchObject({ name: '1' });
        });
        it('accepts a decimal for name', () => {
            expect(UserFactory(1, 1.1)).toMatchObject({ name: '1.1' });
        });
        it('accepts symbols for name', () => {
            expect(UserFactory(1, '#$%^&*@!~_+=?')).toMatchObject({ name: '#$%^&*@!~_+=?' });
        });
    });
});

// describe('GameFactory tests', () => {
//     describe('GameFactory "id" tests', () => {
//         it('accepts an integer as "user_id', () => {
//             expect(GameFactory(1, 30)).toEqual()
//         });
//         it('accepts string as "user_id"', () => {
            
//         });
//     });
//     describe('GameFactory "duration" tests', () => {
        
//     })
// });
