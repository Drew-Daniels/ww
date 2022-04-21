import { 
    doc, 
    setDoc,
    getFirestore,
} from 'firebase/firestore';

// Factory functions
const User = (name) => ({
    name,
})
const Game = (user_id, duration_sec) => ({
    user_id,
    duration_sec,
})

const db = getFirestore();

addUsers();
addGames();

// DEFINITIONS
async function addUsers() {
    setDoc(doc(db, 'users', 'user-id-1'), User('user1'));
    setDoc(doc(db, 'users', 'user-id-1'), User('user2'));
    setDoc(doc(db, 'users', 'user-id-3'), User('user3'));
    setDoc(doc(db, 'users', 'user-id-4'), User('user4'));
    setDoc(doc(db, 'users', 'user-id-5'), User('user5'));
}

async function addGames() {
    setDoc(doc(db, 'games', 'game-id-1'), Game('user-id-1', 30));
    setDoc(doc(db, 'games', 'game-id-2'), Game('user-id-2', 45));
    setDoc(doc(db, 'games', 'game-id-3'), Game('user-id-3', 20));
    setDoc(doc(db, 'games', 'game-id-4'), Game('user-id-4', 25));
    setDoc(doc(db, 'games', 'game-id-5'), Game('user-id-5', 25));
}