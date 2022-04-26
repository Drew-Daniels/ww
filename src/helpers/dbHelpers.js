import {
getDocs,
collection,
doc,
deleteDoc,
setDoc,
} from 'firebase/firestore';

import { db } from '../firebase';
import { GameFactory, getRandGameData } from './factories';

export async function resetDummyDb() {
    await teardownDummyDb();
    initDummyDb();
}

/**
 * Deletes all docs from collections in the database (use only for development)
 */
export async function teardownDummyDb() {

    removeGames();

    // DEFINITIONS
    async function removeGames() {
        removeAllDocs('games');
    }
    async function removeAllDocs(collectionName) {
        const querySnapshot = await getDocs(collection(db, 'games'));
        querySnapshot.forEach(async (doc) => {
            await deleteDoc(doc.ref);
        });
        console.log(`All documents have been deleted from Firestore db ${collectionName} collection`);
    }
}

/**
 * Adds dummy data to the database for development purposes
 */
export function initDummyDb() {
    
    addGames(15);
    /**
     * Adds dummy games documents to the 'games' collection for development purposes
     * @param {integer} numGames 
     */    
    async function addGames(numGames) {
        if (!Number.isSafeInteger(numGames)) {
            throw new Error('numGames must be an integer');
        }
        await Promise.all(
            [...Array(numGames).keys()].map(async () => addGame(getRandGameData()))
        )
        console.log(`${numGames} games added to the "games" Firestore db collection`);
    }
}

export async function addGame(gameData) {
    return setDoc(doc(db, 'games', gameData.id), GameFactory(gameData));
}