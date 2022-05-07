import { IconContext } from 'react-icons';
import { FcAcceptDatabase as ValidateIcon } from 'react-icons/fc';
import { Form, Button } from 'react-bootstrap';
import './Choices.scss';

export default function Choices(props) {

    const { x, y, characters, handleChoiceSubmit } = props;

    return (
        <Form className='choices' style={{ left: `${x + 128}px`, top: `${y}px`}} onSubmit={handleChoiceSubmit} onClick={e => e.stopPropagation()} >
            <h3 className='choice-header'>Who'd you find?</h3>
            {characters.map((character, i) => {
                if (character.isFound) { return }
                return (
                    <Form.Check key={i} type='radio' id={character.name}>
                        <Form.Check.Input type='radio' name='character' value={character.name} />
                        <Form.Check.Label className='character-choice-label'>{character.name}</Form.Check.Label>
                    </Form.Check>
                )
            })}
            <Button type='submit' variant='danger' className='d-flex justify-content-center align-items-center mt-2'>
                <span style={{ marginRight: '.25rem' }}>Check DB</span>
                <IconContext.Provider value={{ size: '2rem'}}>
                    <ValidateIcon />
                </IconContext.Provider>
            </Button>
        </Form>
    )
}
