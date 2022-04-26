import { GameFactory as gf } from './factories';

describe('gf', () => {
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