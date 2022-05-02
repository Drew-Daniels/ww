import { randIntBetween } from "./math";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

/**
 * Creates a Game object that tracks game-related data for db storage
 * @param {integer} map_id 
 * @param {string} username
 * @param {integer} duration 
 * @param {boolean} is_complete 
 * @returns [Object]
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
    if (typeof is_complete === 'number' && [0, 1].includes(is_complete)) {
        is_complete = Boolean(is_complete);
    }
    if (!(typeof is_complete === 'boolean')) {
        throw new Error('is_complete must be a boolean');
    }

    return {
        map_id,
        username, 
        duration,
        is_complete,
    };
}

/**
 * Generates dummy game data to simulate real data that will be generated as users play games
 * @returns [Object]
 */
export const getRandGameData = () => {

    function getRandUsername(length) {
        return uniqueNamesGenerator({
            dictionaries: [adjectives, animals, colors],
            length: length,
        });
    }

    return {
        map_id: randIntBetween(0, 1), 
        username: getRandUsername(3), 
        duration: randIntBetween(0, 90),
        is_complete: randIntBetween(0, 1),
    }
}