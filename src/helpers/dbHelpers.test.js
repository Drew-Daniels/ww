import { saveGame, saveGames, initDummyDb, teardownDummyDb, resetDummyDb } from './dbHelpers';
import { getRandGameData } from './factories';

describe('saveGame', () => {
    var gameData;
    beforeAll(() => {
        gameData = getRandGameData();
    });
    it('adds a game with provided data', async () => {
        const result = saveGame(gameData);
        await expect(result).resolves.toEqual(true);
    });
});

describe('saveGames', () => {
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

