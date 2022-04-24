import { Container, Row, Col } from 'react-bootstrap';
import CharacterLegend from '../CharacterLegend/CharacterLegend';
import Timer from '../Timer/Timer';
import './SideBar.scss';

export default function SideBar(props) {

    return (
        <Container fluid className='d-flex'>
            <Row className='d-flex flex-grow-1'>
                <Col lg={3}>
                    <Timer />
                </Col>
                <Col lg={9} className='d-flex align-items-center'>
                    <CharacterLegend />
                </Col>
            </Row>
        </Container>
    )
}
