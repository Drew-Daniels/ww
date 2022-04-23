import { Container, Row, Col } from 'react-bootstrap';
import SideBar from '../../components/SideBar/SideBar';
import Arena from '../../components/Arena/Arena';
import './Game.scss';

export default function Game(props) {

    return (
        <Container fluid className='d-flex flex-column flex-grow-1'>
            <Row className='d-flex p-2'>
                <SideBar />
            </Row>
            <Row className='flex-grow-1 p-2'>
                <Arena className='flex-grow-1'/>    
            </Row>
        </Container>
    )
}
