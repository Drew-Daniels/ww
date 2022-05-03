import { IconContext } from 'react-icons';
import { BsCheckCircleFill as FoundIcon, BsXCircleFill as NotFoundIcon } from 'react-icons/bs';
import { Form, Button } from 'react-bootstrap';
import './Choices.scss';

export default function Choices(props) {

    const { x, y, characters, handleChoiceSubmit } = props;

    return (
        <Form className='choices' style={{ left: `${x + 128}px`, top: `${y}px`}} onSubmit={handleChoiceSubmit} >
            {characters.map((character, i) => {
                return (
                    <Button key={i} type='submit' value='character-1' className='btn-base d-flex justify-content-between align-items-center' >
                        {character.name}
                        {!character.isFound &&
                            <IconContext.Provider value={{size: '1em', color: 'red'}}>
                                <NotFoundIcon />
                            </IconContext.Provider>                        
                        }
                        {character.isFound &&
                            <IconContext.Provider value={{size: '1em', color: 'green'}}>
                                <FoundIcon />
                            </IconContext.Provider>
                        }
                    </Button>
                )
            })}
        </Form>
    )
}
