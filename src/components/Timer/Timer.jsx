import { useStopwatch, useState, useEffect } from 'react-timer-hook';
import { Container, Row, Col } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { RiTimer2Fill as TimerIcon } from 'react-icons/ri';

import './Timer.scss';

export default function Timer() {

    const {
        seconds,
        minutes
    } = useStopwatch({ autoStart: true });

    const [timer, setTimer] = useState('')

    useEffect(() => {
        const newTime = formatTime(minutes, seconds);
        setTimer(newTime);
    }, [seconds, minutes])

    return (
        <Container className='d-flex align-items-center timer'>
            <Row className='d-flex flex-grow-1 justify-content-center align-items-center'>
                <Col className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <IconContext.Provider value={{ size: '1em' }}>
                        <TimerIcon className='timer-icon spin' />    
                    </IconContext.Provider>
                </Col>
                <Col className='d-flex flex-grow-1 justify-content-center align-items-center'>
                    <span>{timer}</span>
                </Col>
            </Row>
        </Container>
    )

    function formatTime(minutes, seconds) {
        var min = String(minutes).padStart(2, '0');
        var sec = String(seconds).padStart(2, '0');
        return `${min}:${sec}`
    }
}
