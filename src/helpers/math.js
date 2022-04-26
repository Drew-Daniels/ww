/**
 * Returns a random integer between a lowerbound (lb) and upperbound (ub) number
 * @param {*} min 
 * @param {*} max 
 */
    function randIntBetween(min, max) {
    if (min.isInteger() && max.isInteger()) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        console.error('min and max must both be integers')
    }
}

export {
    randIntBetween,
}