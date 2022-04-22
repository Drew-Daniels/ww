import { initializeApp } from 'firebase/app';
import { getFirebaseConfig } from './firebase-config';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);
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