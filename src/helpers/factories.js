/**
 * Returns a 'Game' object - only the 'map_id' parameter is required.
 * @param {integer} map_id 
 * @param {string} username 
 * @param {integer} duration 
 * @param {boolean} is_complete 
 * @returns [Game object]
 */
export const GameFactory = (map_id, username, duration, is_complete) => {

    // MAP_ID
    if (!Number.isSafeInteger(map_id)) {
        throw new Error('map_id must be an integer')
    }
    if (map_id < 0) {
        throw new Error('map_id must be 0 or greater')
    }
    
    // SET DEFAULTS
    username = username ? username: '';
    duration = duration ? duration: 0;
    is_complete = is_complete ? is_complete : false;

    // DURATION
    if (!Number.isSafeInteger(duration)) {
        throw new Error('duration must be an integer')
    }
    if (duration < 0) {
        throw new Error('duration must be 0 or greater')
    }
    // IS_COMPLETE
    if (!typeof is_complete === 'boolean') {
        throw new Error('is_complete must be a boolean');
    }

    return {
        map_id,
        username, 
        duration,
        is_complete,
    };
}
