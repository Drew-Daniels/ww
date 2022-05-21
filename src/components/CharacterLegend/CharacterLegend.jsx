import { Container, ListGroup, Card, Placeholder, Spinner } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { AiOutlineCheck as FoundIcon } from 'react-icons/ai';
import { AiOutlineQuestion as NotFoundIcon } from 'react-icons/ai';
import './CharacterLegend.scss';

export default function CharacterLegend(props) {
    const { loaded, characters } = props;

    return (
        <Container fluid className='d-flex justify-content-center align-items-center character-legend'>
            <ListGroup className='d-flex flex-grow-1 flex-row'>
                {characters.map((character, i) => {
                    const { name, imgURL, isFound } = character;
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
                                    <Card.Title className='d-flex justify-content-center align-items-center'>
                                        <span className='character-name'>{name}</span>

                                    </Card.Title>
                                }
                                <Card.Body>
                                    <div className='d-flex flex-column justify-content-center align-items-center'>
                                        {isFound && 
                                            <IconContext.Provider value={{ color: 'green' }}>
                                                <FoundIcon />
                                            </IconContext.Provider>
                                        }
                                        {!isFound && 
                                            <IconContext.Provider value={{ color: '#fd5252'}}>
                                                <NotFoundIcon />
                                            </IconContext.Provider>
                                        }
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
