import { Container, Row, Col } from 'react-bootstrap';
import CharacterLegend from '../CharacterLegend/CharacterLegend';
import Timer from '../Timer/Timer';
import './StatusBar.scss';

export default function StatusBar(props) {

    const { loaded, duration, characters } = props;

    return (
        <Container fluid className='d-flex status-bar'>
            <Row className='d-flex flex-grow-1 align-items-center'>
                <Col lg={3}>
                    <Timer loaded={loaded} duration={duration} />
                </Col>
                <Col lg={9} className='d-flex align-items-center'>
                    <CharacterLegend loaded={loaded} characters={characters} />
                </Col>
            </Row>
        </Container>
    )
}
