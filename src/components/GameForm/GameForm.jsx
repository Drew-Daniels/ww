import { Form, FloatingLabel, Button } from 'react-bootstrap';
import './GameForm.scss';

export default function GameForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
        
    }

    return (
        <Form onSubmit={handleSubmit}>
            <h1>Congrats! You found all the characters.</h1>
            <h2>Log your win and then head over to the leaderboards to see if you placed.</h2>
            <FloatingLabel
                controlId='usernameInput'
                className='mb-3'
            >
                <Form.Control type='text' placeholder='username@here'></Form.Control>
            </FloatingLabel>
            <Button variant='warning' type='submit'>Submit</Button>
        </Form>
    )
}