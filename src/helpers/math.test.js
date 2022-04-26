import { toBeOneOf } from 'jest-extended';
import { randIntBetween as rib } from './math';

expect.extend({ toBeOneOf });

describe('argument rules', () => {
    it('min is decimal => ERROR', () => {
        expect(() => {rib(0.1, 1)}).toThrow();
    });
    it('max is decimal => ERROR', () => {
        expect(() => {rib(1, 0.1)}).toThrow();
    });
    it('min > max => ERROR', () => {
        expect(() => {rib(2, 1)}).toThrow();
    });
    it('min === max => ERROR', () => {
        expect(() => {rib(1, 1)}).toThrow();
    });
});

describe('results', () => {
    it('Returns an integer between 2 positive numbers', () => {
        expect(rib(1, 2)).toBeOneOf([1, 2]);
    });
    it('Returns an integer between 2 positive numbers, with more than 1 number between', () => {
        expect(rib(1, 3)).toBeOneOf([1, 2, 3]);
    });
    it('Returns an integer between a negative and positive number', () => {
        expect(rib(-1, 1)).toBeOneOf([-1, 0, 1]);
    });
});


