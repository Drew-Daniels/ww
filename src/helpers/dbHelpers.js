import {
getDocs,
collection,
doc,
deleteDoc,
setDoc,
} from 'firebase/firestore';

import { db } from '../firebase';

// Factory functions
const UserFactory = (name) => ({
    name,
  });
  
const GameFactory = (user_id, duration_sec) => ({
    user_id,
    duration_sec,
})
  
async function resetCollections() {

    await removeAll();
    await addAll();

    // DEFINITIONS
    async function removeAll() {
        await Promise.all([
        removeGames(),
        removeUsers(),
        ])
        console.log('All collections emptied');
    }
    // empty
    async function removeUsers() {
        const querySnapshot = await getDocs(collection(db, 'users'));
        querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        })
        console.log('All users have been deleted from Firestore db "users" collection');
    }

    async function removeGames() {
        const querySnapshot = await getDocs(collection(db, 'games'));
        querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        })
        console.log('All games have been deleted from Firestore db "games" collection');
    }

    // add
    async function addAll() {
        await Promise.all([
        addUsers(),
        addGames(),
        ])
        console.log('All collections filled with new data');
    }
    async function addUsers() {
        await Promise.all([
            setDoc(doc(db, 'users', 'user-id-1'), UserFactory('user1')),
            setDoc(doc(db, 'users', 'user-id-1'), UserFactory('user2')),
            setDoc(doc(db, 'users', 'user-id-3'), UserFactory('user3')),
            setDoc(doc(db, 'users', 'user-id-4'), UserFactory('user4')),
            setDoc(doc(db, 'users', 'user-id-5'), UserFactory('user5')),
            setDoc(doc(db, 'users', 'user-id-6'), UserFactory('user6')),
            setDoc(doc(db, 'users', 'user-id-7'), UserFactory('user7')),
            setDoc(doc(db, 'users', 'user-id-8'), UserFactory('user8')),
            setDoc(doc(db, 'users', 'user-id-9'), UserFactory('user9')),
            setDoc(doc(db, 'users', 'user-id-10'), UserFactory('user10')),
            setDoc(doc(db, 'users', 'user-id-11'), UserFactory('user11')),
            setDoc(doc(db, 'users', 'user-id-12'), UserFactory('user12')),
            setDoc(doc(db, 'users', 'user-id-13'), UserFactory('user13')),
            setDoc(doc(db, 'users', 'user-id-14'), UserFactory('user14')),
            setDoc(doc(db, 'users', 'user-id-15'), UserFactory('user15')),
        ])
        console.log('15 users added to the "users" Firestore db collection');
    }

    async function addGames() {
        await Promise.all([
            setDoc(doc(db, 'games', 'game-id-1'), GameFactory('user-id-1', 30)),
            setDoc(doc(db, 'games', 'game-id-2'), GameFactory('user-id-2', 45)),
            setDoc(doc(db, 'games', 'game-id-3'), GameFactory('user-id-3', 20)),
            setDoc(doc(db, 'games', 'game-id-4'), GameFactory('user-id-4', 25)),
            setDoc(doc(db, 'games', 'game-id-5'), GameFactory('user-id-5', 25)),
            setDoc(doc(db, 'games', 'game-id-6'), GameFactory('user-id-6', 30)),
            setDoc(doc(db, 'games', 'game-id-7'), GameFactory('user-id-7', 45)),
            setDoc(doc(db, 'games', 'game-id-8'), GameFactory('user-id-8', 20)),
            setDoc(doc(db, 'games', 'game-id-9'), GameFactory('user-id-9', 25)),
            setDoc(doc(db, 'games', 'game-id-10'), GameFactory('user-id-10', 25)),
            setDoc(doc(db, 'games', 'game-id-11'), GameFactory('user-id-11', 30)),
            setDoc(doc(db, 'games', 'game-id-12'), GameFactory('user-id-12', 45)),
            setDoc(doc(db, 'games', 'game-id-13'), GameFactory('user-id-13', 20)),
            setDoc(doc(db, 'games', 'game-id-14'), GameFactory('user-id-14', 25)),
            setDoc(doc(db, 'games', 'game-id-15'), GameFactory('user-id-15', 25)),
        ])
        console.log('15 games added to the "games" Firestore db collection');
        }
}

export {
    resetCollections,
    GameFactory,
    UserFactory,
}