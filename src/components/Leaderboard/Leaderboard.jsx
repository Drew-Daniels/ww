import { Container, Row, Col, ListGroup, Badge, Placeholder } from 'react-bootstrap';
import './Leaderboard.scss';

export default function Leaderboard(props) {

    const { loaded, mapName, mapRecords } = props;

    var placeholders = [];
    for (let i=0; i < mapRecords.length; i++) {
        placeholders.push(
            <Placeholder key={i} as={ListGroup.Item} xs={12} animation='glow'>
                <Placeholder xs={12} />
            </Placeholder>
        )
    }

    return (
        <Col>
            <h1 className='text-center'>{mapName}</h1>
            <ListGroup className='d-flex flex-grow-1' variant='flush'>
                {!loaded && placeholders }
                {loaded &&
                    mapRecords.map((record, i) => {
                        i++
                        return (
                            <ListGroup.Item key={i} as='li' className="d-flex">
                                <Row className='d-flex flex-grow-1'>
                                    <Col lg={2} className="d-flex justify-content-end align-items-center">
                                        <Badge className={i === 1 ? 'gold': i=== 2 ? 'silver' : i=== 3 ? 'bronze' : 'other'} pill >
                                            {i}
                                        </Badge>
                                    </Col>
                                    <Col lg={10}>
                                        <Container className='d-flex'>
                                            <h1>{record.username}</h1>
                                            <span>{record.duration} ms</span>
                                        </Container>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </Col>
    )
}