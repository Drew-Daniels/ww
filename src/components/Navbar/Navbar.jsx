import { IconContext } from 'react-icons';
import { Container, Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Navbar.scss';

export default function CustomNavbar(props) {

    const { AppIcon, appTitle, routes } = props;

    return (
        <Navbar as='nav' expand='lg' bg='dark' variant='dark'>
            <Container>
                <Navbar.Brand href='/'>
                    <IconContext.Provider value={{ size: '2em', color: '#d9534f'}}>
                        <AppIcon />
                    </IconContext.Provider>
                    <h1>{appTitle}</h1>
                </Navbar.Brand>
                <Navbar.Collapse>
                    <Nav>
                        {routes.map((route, i) => {
                            return (
                                <Link
                                    key={i}
                                    to={route.name === 'home' ? '/' : route.name}
                                >
                                    <route.icon />
                                    {route.getDisplayName()}
                                </Link>
                            )
                        })}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}