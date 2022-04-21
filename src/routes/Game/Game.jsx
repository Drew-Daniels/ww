import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../../components/SideBar/SideBar';
import Arena from '../../components/Arena/Arena';
import './Game.scss';

export default function Game(props) {

    return (
        <Container fluid className='d-flex flex-grow-1'>
            <Row className='d-flex flex-grow-1'>
                <Col lg={3}>
                    <SideBar />    
                </Col>
                <Col>
                    <Arena />    
                </Col>
            </Row>
        </Container>
    )
}
