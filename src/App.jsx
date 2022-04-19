import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { FaSearch as AppIcon } from 'react-icons/fa';
import { RiHomeFill as HomeIcon } from 'react-icons/ri';
import { FaGamepad as GameIcon } from 'react-icons/fa';
import { MdSportsScore as LeaderboardsIcon } from 'react-icons/md';

import './stylesheets/App.css';

const appTitle = "Where's Waldo"

class Route {
  constructor(name, icon) {
    this.name = name;
    this.icon = icon;
  }
  getDisplayName() {
    return this.name[0].toUpperCase() + this.name.slice(1);
  }
}

const routes = [
  new Route('home', HomeIcon),
  new Route('game', GameIcon),
  new Route('leaderboards', LeaderboardsIcon),
]

function App() {
  return (
    <div className="App">
      <Navbar AppIcon={AppIcon} appTitle={appTitle} routes={routes} />
      <Outlet />
      <Footer />
    </div>
  );
}

export default App;
