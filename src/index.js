import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Home from './routes/Home/Home';
import GameBase from './routes/GameBase/GameBase';
import GameChoices from './components/GameChoices/GameChoices';
import GameArena from './components/GameArena/GameArena';
import Leaderboards from './routes/Leaderboards/Leaderboards';
import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom';

import { getImageURL } from './helpers/storHelpers';

class Map {
  constructor(id, name, difficulty, characters) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
    this.characters = characters;
  }
}

class Character {
  constructor(id, name, difficulty, coordinates) {
    this.id = id;
    this.name = name;
    this.difficulty = difficulty;
  }
}

const maps = [];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App getImageURL={getImageURL} />}>
          <Route index element={<Home />} />
          <Route path='game' element={<GameBase />} >
            <Route index element={<GameChoices maps={maps} />} />
            <Route path=':mapId' element={<GameArena />} />
          </Route>
          <Route path='leaderboards' element={<Leaderboards />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
