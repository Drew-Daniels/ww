import { GameFactory as gf } from './factories';

describe('gf', () => {
    describe('map_id', () => {
        it('accepts a positive integer', () => {
            expect(gf(1)).toMatchObject({ map_id: 1 });
        });
        it('DOES not accept a decimal', () => {
            expect(() => gf(1.1)).toThrow();
        });
        it('DOES not accept 0', () => {
            expect(() => gf(0)).toThrow();
        });
        it('DOES not accept a negative integer', () => {
            expect(() => gf(-1)).toThrow();
        });
        it('DOES not accept a negative decimal', () => {
            expect(() => gf(-1.1)).toThrow();
        });
    });
    describe('username', () => {
        it('accepts undefined', () => {
            expect(gf(1)).toMatchObject({ username: '' });
        });
        it('accepts a blank string', () => {
            expect(gf(1, '')).toMatchObject({ username: '' })
        })
        it('accepts a non-blank string', () => {
            expect(gf(1, 'spam')).toMatchObject({ username: 'spam' })
        });
        it('accepts an integer', () => {
            expect(gf(1, 1)).toMatchObject({ username: '1' });
        });
        it('accepts a decimal', () => {
            expect(gf(1, 1.1)).toMatchObject({ username: '1.1' });
        });
        it('accepts symbols', () => {
            expect(gf(1, '!@#$%^&*+=-?`')).toMatchObject({ username: '!@#$%^&*+=-?`' })
        });
    });
    describe('duration', () => {
        it('accepts undefined', () => {
            expect(gf(1)).toMatchObject({ duration: 0 })
        });
        it('accepts 0', () => {
            expect(gf(1, 1, 0)).toMatchObject({ duration: 0 })
        });
        it('accepts a positive integer', () => {
            expect(gf(1, 1, 1)).toMatchObject({ duration: 1 })
        });
        it('does NOT accept a decimal', () => {
            expect(() => gf(1, 1, 1.1)).toThrow()
        });
        it('does NOT accept a negative integer', () => {
            expect(() => gf(1, 1, -1)).toThrow()
        });
        it('does NOT accept a negative decimal', () => {
            expect(() => gf(1, 1, -1.1)).toThrow()
        });
    });
    describe('is_complete', () => {
        it('accepts undefined', () => {
            expect(gf(1, 1, 1)).toMatchObject({ is_complete: false });
        });
        it('accepts true', () => {
            expect(gf(1, 1, 1, true)).toMatchObject({ is_complete: true });
        });
        it('accepts false', () => {
            expect(gf(1, 1, 1, false)).toMatchObject({ is_complete: false });
        });
        it('accepts 1', () => {
            expect(gf(1, 1, 1, 1)).toMatchObject({ is_complete: true });
        });
        it('accepts 0', () => {
            expect(gf(1, 1, 1, 0)).toMatchObject({ is_complete: false });
        });
        it('does NOT accept a string', () => {
            expect(() => gf(1, 1, 1, 'spam')).toThrow();
        });
        it('does NOT accept an integer greater than 1', () => {
            expect(() => gf(1, 1, 1, 2)).toThrow();
        });
        it('does NOT accept an integer less than 0', () => {
            expect(() => gf(1, 1, 1, -1)).toThrow();
        });
        it('does NOT accept a decimal greater than 1', () => {
            expect(() => gf(1, 1, 1, 1.1)).toThrow();
        });
        it('does NOT accept a decimal less than 0', () => {
            expect(() => gf(1, 1, 1, -1.1)).toThrow();
        });
    });
});