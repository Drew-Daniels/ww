import { addGame, addGames, initDummyDb, teardownDummyDb, resetDummyDb } from './dbHelpers';
import { getRandGameData } from './factories';

describe('addGame', () => {
    var gameData;
    beforeAll(() => {
        gameData = getRandGameData();
    });
    it.todo('adds a game with provided data');
});

describe('addGames', () => {
    beforeEach(() => {
        // create random game data for 'n' games
    })
    afterEach(() => {
        // remove added games
    })
    it.todo('adds 1 game');
    it.todo('adds 10 games');
    it.todo('DOES not add 0 games');
    it.todo('DOES not add -1 games');
});

