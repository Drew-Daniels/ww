/**
 * 
 * @param {*} param0 
 * @returns 
 */
export const GameFactory = ({map_id=1, username='', duration=0, is_complete=false} = {}) => {
    // MAP_ID
    if (!Number.isSafeInteger(map_id)) {
        throw new Error('map_id must be an integer')
    }
    if (map_id <= 0) {
        throw new Error('map_id must greater than 0')
    }
    // USERNAME
    username = String(username);
    // DURATION
    if (!Number.isSafeInteger(duration)) {
        throw new Error('duration must be an integer')
    }
    if (duration < 0) {
        throw new Error('duration must be 0 or greater')
    }
    // IS_COMPLETE
    if (!(typeof is_complete === 'boolean')) {
        throw new Error('is_complete must be a boolean');
    }
    is_complete = Boolean(is_complete);

    return {
        map_id,
        username, 
        duration,
        is_complete,
    };
}
