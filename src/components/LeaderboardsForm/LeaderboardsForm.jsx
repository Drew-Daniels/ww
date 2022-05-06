import { Form, Container, Modal, FloatingLabel, Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { IoMdClose as CloseIcon } from 'react-icons/io'
import './LeaderboardsForm.scss';

export default function GameForm(props) {

    const { duration, show, onHide, onSubmit } = props;

    return (
        <Modal
            size='lg'
            centered
            id='leaderboards-form'
            show={show}
            onHide={onHide}
            className='leaderboards-form-container'
        >
            <Modal.Header className='modal-header'>
                <Modal.Title>                
                    Solid detective work...
                </Modal.Title>
                <Button variant='danger' onClick={onHide}>
                    <IconContext.Provider value={{ size: '2em' }}>
                        <CloseIcon />
                    </IconContext.Provider>
                </Button>
            </Modal.Header>
            <Modal.Body className='modal-body'>
                <Form className='leaderboards-form mb-3' onSubmit={onSubmit}>
                    <h2 className='text-center'>
                        You found all the characters in 
                            <span className='duration'>
                                {duration} 
                            </span>
                        seconds!
                    </h2>
                    <p className='text-center'>If you would like to log your win on the leaderboards, enter your username below:</p>
                    <FloatingLabel
                        controlId='username'
                        label='username'
                        className='mb-3 username-control'
                    >
                        <Form.Control name='username' type='text' placeholder='yourusernamehere'></Form.Control>
                    </FloatingLabel>
                    <Container className='d-flex justify-content-center'>
                        <Button type='submit' variant='danger mx-auto'>Submit</Button>
                    </Container>
                </Form>
            </Modal.Body>
        </Modal>
    )
}