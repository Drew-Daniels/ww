import {
getDocs,
collection,
doc,
deleteDoc,
setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { GameFactory } from './factories';
import { randIntBetween } from './math';

async function resetDummyDb() {
    await teardownDummyDb();
    initDummyDb();
}

/**
 * Deletes all docs from collections in the database (use only for development)
 */
async function teardownDummyDb() {

    removeAll();

    // DEFINITIONS
    async function removeAll() {
        await removeGames();
        console.log('All collections emptied');
    }
    async function removeGames() {
        removeAllDocs('games');
    }
    async function removeAllDocs(collectionName) {
        try {
            const querySnapshot = await getDocs(collection(db, 'games'));
            querySnapshot.forEach(async (doc) => {
                await deleteDoc(doc.ref);
            })
            console.log(`All documents have been deleted from Firestore db ${collectionName} collection`);
        }
        catch(err) {
            console.error(err);
        }
    }
}

/**
 * Adds dummy data to the database for development purposes
 */
function initDummyDb() {
    
    addGames(15);
    
    async function addGames(numGames) {
        try {
            await Promise.all(
                [...Array(numGames).keys()].map(i => addGame(i, i, randIntBetween(0, 90)))
            )
            console.log(`${numGames} games added to the "games" Firestore db collection`);
        }
        catch (err) {
            console.error(err);
        }
    }
}

async function addGame(id, userId, duration) {
    try {
        return setDoc(doc(db, 'games', id), GameFactory(userId, duration));
    }
    catch(err) {
        console.error(err);
    }
}


export {
    resetDummyDb,
    teardownDummyDb,
    initDummyDb,
    addGame,
}