import { UserFactory, GameFactory } from './factories';

describe('UserFactory', () => {
    describe('id', () => {
        it('accepts an integer greater than 0', () => {
            expect(UserFactory(1)).toMatchObject({ id: 1 });
        });
        it('does NOT accept a decimal', () => {
            expect(() => UserFactory(1.1)).toThrow();
        });
        it('does NOT accept a 0', () => {
            expect(() => UserFactory(0)).toThrow();
        });
        it('does NOT accept a negative integer', () => {
            expect(() => UserFactory(-1)).toThrow();
        });
        it('does NOT accept no value being passed', () => {
            expect(() => UserFactory()).toThrow();
        });

    });
    describe('name', () => {
        it('accepts undefined', () => {
            expect(UserFactory(1)).toMatchObject({ name: '' });
        });
        it('accepts a blank string', () => {
            expect(UserFactory(1, '')).toMatchObject({ name: '' });
        });
        it('accepts a passed-in string', () => {
            expect(UserFactory(1, 'spam')).toMatchObject({ name: 'spam' });
        });
        it('accepts an integer', () => {
            expect(UserFactory(1, 1)).toMatchObject({ name: '1' });
        });
        it('accepts a decimal', () => {
            expect(UserFactory(1, 1.1)).toMatchObject({ name: '1.1' });
        });
        it('accepts symbols', () => {
            expect(UserFactory(1, '#$%^&*@!~_+=?')).toMatchObject({ name: '#$%^&*@!~_+=?' });
        });
    });
});

describe('GameFactory', () => {
    describe('user_id', () => {
        it('accepts a positive integer', () => {
            expect(GameFactory(1)).toMatchObject({ user_id: 1 })
        });
        it('does NOT accept a positive decimal', () => {
            expect(() => GameFactory(1.1)).toThrow();
        });
        it('does NOT accept a 0', () => {
            expect(() => GameFactory(0)).toThrow();
        });
        it('does NOT accept a negative integer', () => {
            expect(() => GameFactory(-1)).toThrow();
        });
        it('does NOT accept a negative decimal', () => {
            expect(() => GameFactory(-1.1)).toThrow();
        });
        it('does NOT accept a string', () => {
            expect(() => GameFactory('spam')).toThrow();
        });
        it('does NOT accept undefined', () => {
            expect(() => GameFactory()).toThrow();
        })
    });
    describe('duration', () => {
        it('accepts a positive integer', () => {
            expect(GameFactory(1, 30)).toMatchObject({ duration: 30 })
        });
        it('accepts 0', () => {
            expect(GameFactory(1, 0)).toMatchObject({ duration: 0 })
        });
        it('accepts undefined', () => {
            expect(GameFactory(1)).toMatchObject({ duration: 0 })
        });
        it('does NOT accept a positive decimal', () => {
            expect(() => GameFactory(1, 30.1)).toThrow();
        });
        it('does NOT accept a negative integer', () => {
            expect(() => GameFactory(1, -30)).toThrow();
        });
        it('does NOT accept a negative decimal', () => {
            expect(() => GameFactory(1, -30.1)).toThrow();
        });
        it('does NOT accept a string', () => {
            expect(() => GameFactory(1, 'spam')).toThrow();
        });
    })
});
