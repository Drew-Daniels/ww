import { Container, ListGroup } from 'react-bootstrap';
import ValidationMessageValidating from '../ValidationMessageValidating/ValidationMessageValidating';
import ValidationMessageInvalid from '../ValidationMessageInvalid/ValidationMessageInvalid';
import ValidationMessageValid from '../ValidationMessageValid/ValidationMessageValid';
import './Choices.scss';

export default function Choices(props) {

    const { x, y, characters, handleCharacterSelect, isValidating, isValid, validated } = props;

    return (
        <div style={{ left: `${x + 128}px`, top: `${y}px`}} className='d-flex flex-column choices' onClick={e => e.stopPropagation()}>
            <h3 className='choice-header'>Who'd you find?</h3>
            <ListGroup>
                {characters.map((character, i) => {
                    if (character.isFound) { return }
                    return (
                        <ListGroup.Item as='button' key={i} action variant='danger' onClick={() => handleCharacterSelect(character)}>
                            {character.name}
                        </ListGroup.Item>
                    );
                })}
            </ListGroup>
            <Container className='d-flex justify-content-around align-items-center mt-2'>
                {isValidating && <ValidationMessageValidating />}
                {validated && (isValid ? <ValidationMessageValid /> : <ValidationMessageInvalid />)}
            </Container>
        </div>

    )
}
