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
                        <ListGroup.Item key={i} className='d-flex flex-grow-1 flex-row character-card-container'>
                            <Card className='d-flex flex-grow-1 character-card'>
                                {!loaded &&
                                    <Placeholder as={Card.Title} animation='glow'>
                                        <Placeholder xs={9} />
                                        {" "}
                                        <Placeholder xs={2}/>
                                    </Placeholder>
                                }
                                {loaded &&
                                    <Card.Title className='d-flex justify-content-center'>
                                        <span>{name}</span>
                                    </Card.Title>
                                }
                                <Card.Body>
                                    <div className='d-flex justify-content-center'>
                                        {!loaded &&
                                            <Spinner animation="grow" variant="danger" />
                                        }
                                        {loaded &&
                                            <Card.Img variant='top' src={imgURL} className='character-image' />
                                        }
                                    </div>
                                </Card.Body>
                            </Card>
                        </ListGroup.Item>
                    )
                })}
            </ListGroup>
        </Container>
    )


}
