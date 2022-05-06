import { Form, Container, Modal, FloatingLabel, Button } from 'react-bootstrap';
import './LeaderboardsForm.scss';

export default function GameForm(props) {

    const { duration, show, onHide } = props;

    return (
        <Modal
            size='lg'
            centered
            id='leaderboards-form'
            show={show}
            onHide={onHide}
        >
            <Modal.Header>
                <Modal.Title>                
                    <h1 className='text-center'>
                        Congrats! You found all the characters in 
                            <span style={{ color: 'red' }} className='duration'>
                                {duration} 
                            </span>
                        seconds!
                    </h1>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form className='leaderboards-form mb-3'>
                    <p className='text-center'>If you would like to log your win on the leaderboards, enter your username below:</p>
                    <FloatingLabel
                        controlId='username'
                        label='username'
                        className='mb-3'
                    >
                        <Form.Control type='text' placeholder='yourusernamehere'></Form.Control>
                    </FloatingLabel>
                    <Container className='d-flex justify-content-center'>
                        <Button variant='danger mx-auto'>Submit</Button>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    )
}