import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import { RiHomeFill as HomeIcon } from 'react-icons/ri';
import { FaGamepad as GameIcon } from 'react-icons/fa';
import { MdSportsScore as LeaderboardsIcon } from 'react-icons/md';

import './stylesheets/css/App.css';

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

function App(props) {

  const { getImageURL } = props;

  return (
    <Container fluid className='App d-flex flex-column flex-grow-1 min-vh-100 px-0'>
      <Container fluid className='d-flex flex-column flex-grow-1 px-0'>
        <Navbar appTitle={appTitle} routes={routes} />
        <Outlet context={{
          getImageURL: getImageURL,
        }}/>
      </Container>
      <Footer />
    </Container>
  );
}

export default App;
