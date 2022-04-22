import { initializeApp } from 'firebase/app';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { fbConfig } from './firebase-config';
const app = initializeApp(fbConfig);
const db = getFirestore(app);
const storage = getStorage(app);

if (window.location.hostname === 'localhost') {
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
}

export {
    db,
    storage,
}