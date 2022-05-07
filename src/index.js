import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './routes/Home/Home';
import GameBase from './routes/GameBase/GameBase';
import GameChoices from './components/GameChoices/GameChoices';
import Game from './components/Game/Game';
import Leaderboards from './routes/Leaderboards/Leaderboards';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';
import { db } from './firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route index element={<Home />} />
          <Route path='game' element={<GameBase />} >
            <Route index element={<GameChoices />} />
            <Route path=':mapIdParam' element={<Game db={db} />} />
          </Route>
          <Route path='leaderboards' element={<Leaderboards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  // </React.StrictMode>
);
