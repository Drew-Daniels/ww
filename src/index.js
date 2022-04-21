import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './routes/Home/Home';
import Game from './routes/Game/Game';
import Leaderboards from './routes/Leaderboards/Leaderboards';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from 'firebase/storage';
import { getFirebaseConfig } from './firebase-config';

const firebaseAppConfig = getFirebaseConfig();
const app = initializeApp(firebaseAppConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App getImageURL={getImageURL} />}>
          <Route index element={<Home />} />
          <Route path='game' element={<Game />} />
          <Route path='leaderboards' element={<Leaderboards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// async function getImageURL(folder, fname) {
//   const storage = getStorage(app);
//   const pathRef = ref(storage, [folder, fname].join('/'));
//   const downloadURL = await getDownloadURL(pathRef);
//   console.log(downloadURL);
//   return downloadURL;
// }

/**
 * 
 * @param {string} folder 
 * @param {string} fname 
 * @returns Promise
 */
async function getImageURL(folder, fname) {
  const storage = getStorage(app);
  const pathRef = ref(storage, [folder, fname].join('/'));
  return getDownloadURL(pathRef);
}