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
                    <IconContext.Provider value={{ size: '2em', color: '#fd5252'}}>
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
                                    <IconContext.Provider value={{ color: '#fd5252' }}>
                                        <route.icon />
                                    </IconContext.Provider>
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