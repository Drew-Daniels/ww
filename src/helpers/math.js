export function randIntBetween(min, max) {
    if (!(Number.isInteger(min) && Number.isInteger(max))) {
        throw new Error('min and max must both be integers');
    }
    if (min >= max) { throw new Error('min must be less than the max') }
    return Math.floor(Math.random() * (max - min + 1)) + min;
}