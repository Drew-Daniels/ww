import { Container, Row, Col } from 'react-bootstrap';
import CharacterLegend from '../CharacterLegend/CharacterLegend';
import Timer from '../Timer/Timer';
import './StatusBar.scss';

export default function StatusBar(props) {

    const { duration, characters } = props;

    return (
        <Container fluid className='d-flex'>
            <Row className='d-flex flex-grow-1'>
                <Col lg={3}>
                    <Timer duration={duration} />
                </Col>
                <Col lg={9} className='d-flex align-items-center'>
                    <CharacterLegend characters={characters} />
                </Col>
            </Row>
        </Container>
    )
}
