import { Container, ListGroup, Card, Badge, Placeholder, Spinner } from 'react-bootstrap';
import './CharacterLegend.scss';

export default function CharacterLegend(props) {
    const { loaded, characters } = props;

    return (
        <Container fluid className='d-flex flex-grow-1 justify-content-center align-items-center'>
            <ListGroup className='d-flex flex-grow-1 flex-row'>
                {characters.map((character, i) => {
                    const { name, difficulty, imgURL } = character;
                    return (
                        <ListGroup.Item key={i} className='d-flex flex-grow-1 flex-row'>
                            <Card className='d-flex flex-grow-1'>
                                <Card.Title className='d-flex justify-content-center'>
                                    {!loaded &&
                                        <Placeholder xs={12}></Placeholder>
                                    }
                                    {loaded &&
                                        <>
                                            <span>{name}</span>
                                            <Badge pill>{difficulty}</Badge>
                                        </>
                                    }
                                </Card.Title>
                                <div className='d-flex justify-content-center'>
                                    {!loaded &&
                                        <Spinner animation="grow" variant="danger" />
                                    }
                                    {loaded &&
                                        <Card.Img variant='top' src={imgURL} className='character-image' />
                                    }
                                </div>
                                <Card.Body>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Container>
    )


}
