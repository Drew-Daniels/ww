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
export const GameFactory = (user_id, duration, is_complete, map_id) => {

    // SET DEFAULTS
    duration = duration ? duration: 0;
    is_complete = is_complete ? is_complete : false;

    // user_id checks
    if (!user_id) {
        throw new Error('user_id must be provided');
    }
    if (!Number.isSafeInteger(user_id)) {
        throw new Error('user_id must be an integer');
    }
    if (user_id < 1) {
        throw new Error('user_id must be 1 or greater');
    }
    // duration checks
    if (!Number.isSafeInteger(duration)) {
        throw new Error('duration must be an integer')
    }
    if (duration < 0) {
        throw new Error('duration must be 0 or greater')
    }
    // is_complete checks
    if (!typeof is_complete === 'boolean') {
        throw new Error('is_complete must be a boolean');
    }
    // map_id checks
    if (!Number.isSafeInteger(map_id)) {
        throw new Error('map_id must be an integer')
    }

    return {
        user_id, 
        duration
    };
}

export const MapFactory = (id, name, characters) => {
    // perform checks


    return {
        id,
        name,
        characters,
    }
}

export const CharacterFactory = (id, name) => {
    // perform checks
    

    return {
        id,
        name,
    }
}