import { Container, Row, Col } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { RiTimer2Fill as TimerIcon } from 'react-icons/ri';

import './Timer.scss';

export default function Timer(props) {

    const {duration} = props;

    return (
        <Container fluid className='d-flex align-items-center timer'>
            <Row className='d-flex flex-grow-1 justify-content-center align-items-center'>
                <Col lg={12} className='d-flex justify-content-center align-items-center'>
                    <IconContext.Provider value={{ size: '1em' }}>
                        <TimerIcon className='timer-icon spin' />    
                    </IconContext.Provider>
                </Col>
                <Col lg={12} className='d-flex justify-content-center align-items-center'>
                    <span className='text-center'>{`${duration} seconds`}</span>
                </Col>
            </Row>
        </Container>
    )
}
