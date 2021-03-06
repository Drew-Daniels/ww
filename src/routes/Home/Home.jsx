import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaGamepad as GameIcon } from 'react-icons/fa';
import AppIconBW from '../../icons/app-icon-bw.svg';
import './Home.scss';

export default function Home(props) {

    const navigate = useNavigate();

    function toGame() {
        navigate('/game');
    }

    return (
        <Container as='main' fluid className='d-flex flex-column flex-grow-1 justify-content-center align-items-center px-0 home'>
            <Container fluid className='d-flex flex-column flex-grow-1 justify-content-between px-0'>
                <Container className='d-flex flex-grow-1 px-0'>
                    <Container className='d-flex flex-column flex-grow-1 justify-content-around align-items-center mag-glass-container'>
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-1' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-2' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-3' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-4' />    
                    </Container>
                    <Container className='d-flex flex-column flex-grow-1 justify-content-around align-items-center mag-glass-container'>
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-2' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-3' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-4' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-1' />    
                    </Container>
                    <Container className='d-flex flex-column flex-grow-1 justify-content-around align-items-center mag-glass-container'>
                        <Container className='d-flex flex-column flex-grow-1 justify-content-center'>
                            <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-3' />    
                        </Container>
                        <Container className='btn-game-container'>
                            <Button variant='danger' className='btn-game' onClick={toGame}>
                                <span>Start</span>
                                <IconContext.Provider value={{ size: '2rem', color: '#fd5252'}}>
                                    <GameIcon />
                                </IconContext.Provider>
                            </Button>
                        </Container>
                        <Container className='d-flex flex-column flex-grow-1 justify-content-center'>
                            <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-2' />    
                        </Container>
                    </Container>
                    <Container className='d-flex flex-column flex-grow-1 justify-content-around align-items-center mag-glass-container'>
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-4' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-1' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-2' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-3' />    
                    </Container>
                    <Container className='d-flex flex-column flex-grow-1 justify-content-around align-items-center mag-glass-container'>
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-1' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-2' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-3' />
                        <img src={AppIconBW} alt='Black and White Magnifying Glass' className='app-icon-bw app-icon-bw-delay-4' />    
                    </Container>
                </Container>
                <div className='d-flex justify-content-center'>
                    <p className='welcome-message'>
                        This is a Where's Waldo game that uses Egor Klyuchnyk's artwork. His portfolio can be found at
                        {' '}
                        <a href="https://www.behance.net/Chekavo">Behance</a>
                        {' and '}
                        <a href="https://www.artstation.com/chekavo">Artstation</a>
                        .
                    </p>
                </div>
            </Container>
        </Container>
    )
}
