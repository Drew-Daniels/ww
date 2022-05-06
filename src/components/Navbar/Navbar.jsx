import { IconContext } from 'react-icons';
import { Container, Navbar, Nav, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import AppIcon from '../../icons/app-icon.svg';

import './Navbar.scss';

export default function CustomNavbar(props) {

    const { appTitle, routes } = props;

    return (
        <Navbar expand='lg' bg='dark' variant='dark'>
            <Container fluid>
                <Row className='d-flex flex-grow-1'>
                        <Navbar.Brand href='/' className='d-flex flex-grow-1 align-items-center justify-content-center'>
                            <Row className='d-flex'>
                                <Col xs={12} sm={2} className='d-flex justify-content-center align-items-center'>
                                    <img src={AppIcon} alt='Magnifying Glass' className='app-icon' />
                                </Col>
                                <Col sm={9} className='d-flex align-items-center justify-content-center'>
                                    <h1>{appTitle}</h1>
                                </Col>
                            </Row>
                        </Navbar.Brand>
                    <Row className='d-flex align-items-center'>
                        <Navbar.Collapse className='d-flex flex-grow-1'>
                            <Nav className='d-flex flex-grow-1 justify-content-around' variant='pills'>
                                {routes.map((route, i) => {
                                    return (
                                        <Nav.Item key={i}>
                                            <LinkContainer
                                                id={route.name + '-btn'}
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
                    </Row>
                </Row>
            </Container>
        </Navbar>
    )
}