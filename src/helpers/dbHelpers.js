import {
getDocs,
collection,
doc,
deleteDoc,
setDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { UserFactory, GameFactory } from './factories';
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
        await Promise.all([
        removeGames(),
        removeUsers(),
        ])
        console.log('All collections emptied');
    }
    async function removeUsers() {
        removeAllDocs('users');
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
    
    addAll();
    
    // DEFINITIONS
    async function addAll() {
        try {
            await Promise.all([
                addUsers(),
                addGames(),
            ])
            console.log('All collections filled with new data');
        }
        catch(err) {
            console.error(err);
        }
    }
    async function addUsers(numUsers) {
        try {
            await Promise.all(
                [...Array(numUsers).keys()].map(i => addUser(i, i))
            )
            console.log(`${numUsers} users added to the "users" Firestore db collection`);
        }
        catch (err) {
            console.error(err);
        }
    }
    async function addUser(id, name) {
        return setDoc(doc(db, 'users', id), UserFactory(id, name));
    }
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
    async function addGame(id, userId, duration) {
        try {
            return setDoc(doc(db, 'games', id), GameFactory(userId, duration));
        }
        catch(err) {
            console.error(err);
        }
    }
}

export {
    resetDummyDb,
    teardownDummyDb,
    initDummyDb,
}