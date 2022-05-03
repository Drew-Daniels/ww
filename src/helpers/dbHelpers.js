import {
getDocs,
collection,
deleteDoc,
addDoc,
} from 'firebase/firestore';

import { db } from '../firebase';
import { GameFactory } from './factories';

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
        return true;
    }
}

/**
 * Adds dummy data to the database for development purposes
 */
export async function initDummyDb() {    
    saveGames(15);
}

/**
 * Adds a new Game document to 'games' collection in Firestore
 * @param {*} gameData 
 * @returns Boolean
 */
export async function saveGame(gameData) {
    await addDoc(collection(db, 'games'), GameFactory(gameData));
    return true;
}

/**
 * Adds dummy games documents to the 'games' collection for development purposes
 * @param {integer} numGames 
 */    
export async function saveGames(gameDataArray) {
    if (!Array.isArray(gameDataArray)) {
        throw new Error('argument must be an array');
    }
    await Promise.all(
        [...Array(gameDataArray.length).keys()].map(async (gameDataObj, i) => saveGame(gameDataArray[i]))
    )
    console.log(`${gameDataArray.length} games added to the "games" Firestore db collection`);
    return true;
}