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
  getFirestore,
  collection,
  getDocs,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
  setDoc,
  updateDoc,
  deleteDoc,
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

import { resetCollections } from './helpers/dbHelpers';
import { getImageURL } from './helpers/storHelpers';

const firebaseAppConfig = getFirebaseConfig();
initializeApp(firebaseAppConfig);

resetCollections();

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
