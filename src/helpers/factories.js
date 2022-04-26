/**
 * 
 * @param {integer} id 
 * @param {*} name 
 * @returns User object
 */
export const UserFactory = (id, name) => {
    if (!Number.isSafeInteger(id)) {
        throw new Error('id must be an integer');
    }
    if (id < 1) {
        throw new Error('id must be greater than 0');
    }
    return { 
        id : id,
        name : name ? String(name) : '',
    };
};

/**
 * 
 * @param {integer} user_id 
 * @param {integer} duration 
 * @returns Game object
 */
export const GameFactory = (user_id, duration) => {
    if (!Number.isSafeInteger(user_id)) {
        throw new Error('user_id must be an integer');
    }
    if (user_id < 1) {
        throw new Error('user_id must be 1 or greater');
    }
    if (duration < 0) {
        throw new Error('duration must be 0 or greater')
    }
    return { user_id, duration };
}