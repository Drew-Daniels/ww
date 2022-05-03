import { randIntBetween } from "./math";
import { uniqueNamesGenerator, adjectives, colors, animals } from "unique-names-generator";

/**
 * Creates a Game object that tracks game-related data for db storage
 * @param {integer} map_id 
 * @param {string} username
 * @param {integer} duration 
 * @returns [Object]
 */
export const GameFactory = ({map_id=1, username='', duration=0} = {}) => {
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

    return {
        map_id,
        username, 
        duration,
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
    }
}