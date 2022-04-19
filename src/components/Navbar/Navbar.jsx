import { IconContext } from 'react-icons';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './Navbar.scss';

export default function CustomNavbar(props) {

    const { AppIcon, appTitle, routes } = props;

    return (
        <Navbar expand='lg' bg='dark' variant='dark'>
            <Container fluid>
                <Row className='d-flex flex-grow-1'>
                    <Col sm={4}>
                        <Navbar.Brand href='/' className='d-flex align-items-center justify-content-center'>
                            <IconContext.Provider value={{ size: '2em', color: '#fd5252'}}>
                                <AppIcon className='icon' />
                            </IconContext.Provider>
                            <h1>{appTitle}</h1>
                        </Navbar.Brand>
                    </Col>
                    <Col className='d-flex align-items-center'>
                        <Navbar.Collapse className='d-flex flex-grow-1'>
                            <Nav className='d-flex flex-grow-1 justify-content-around' variant='pills'>
                                {routes.map((route, i) => {
                                    return (
                                        <Nav.Item key={i}>
                                            <LinkContainer
                                                to={route.name === 'home' ? '/' : route.name}
                                            >   
                                                <Nav.Link className='d-flex justify-content-center align-items-center'>
                                                    <IconContext.Provider value={{ color: '#fd5252' }}>
                                                        <route.icon className='icon'/>
                                                    </IconContext.Provider>
                                                    {route.getDisplayName()}
                                                </Nav.Link>
                                            </LinkContainer>
                                        </Nav.Item>
                                    )
                                })}
                            </Nav>
                        </Navbar.Collapse>
                    </Col>
                </Row>
            </Container>
        </Navbar>
    )
}