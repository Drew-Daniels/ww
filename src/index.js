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

import { getImageURL } from './helpers/storHelpers';

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
