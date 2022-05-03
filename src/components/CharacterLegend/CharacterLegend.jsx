import { Container, ListGroup, Card, Badge } from 'react-bootstrap';
import './CharacterLegend.scss';

export default function CharacterLegend(props) {
    const { characters } = props;

    return (
        <Container fluid className='d-flex flex-grow-1 justify-content-center align-items-center'>
            <ListGroup className='d-flex flex-grow-1 flex-row'>
                {characters.map((character, i) => {
                    const { name, difficulty, imgURL } = character;
                    return (
                        <ListGroup.Item key={i} >
                            <Card>
                            <Card.Title>
                                <span>{name}</span>
                                <Badge pill>{difficulty}</Badge>
                            </Card.Title>
                            <Card.Img variant='top' src={imgURL} className='character-image' />                        
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
