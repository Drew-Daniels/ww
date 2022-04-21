import { useStopwatch } from 'react-timer-hook';
import { Container, Row, Col } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { RiTimer2Fill as TimerIcon } from 'react-icons/ri';

import './Timer.scss';

export default function Timer() {

    const {
        seconds,
        minutes,
        hours,
        days,
        isRunning,
        start,
        pause,
        reset,
      } = useStopwatch({ autoStart: true });

    return (
        <Container className='d-flex align-items-center timer'>
            <Row className='d-flex flex-grow-1 justify-content-center align-items-center'>
                <Col className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <IconContext.Provider value={{ size: '1em' }}>
                        <TimerIcon className='timer-icon spin' />    
                    </IconContext.Provider>
                </Col>
                <Col className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <span>{`${minutes}:${seconds}`}</span>
                </Col>
            </Row>
        </Container>
    )
}
