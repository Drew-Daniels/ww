import { useState, useEffect } from 'react';
import { Container, Placeholder, Spinner, Button } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { FaGamepad as GameIcon } from 'react-icons/fa';
import { useOutletContext } from 'react-router-dom';
import AppIconBW from '../../icons/app-icon-bw.svg';
import './Home.scss';

export default function Home(props) {

    const { getImageURL } = useOutletContext();
    const [portraitURL, setPortraitURL] = useState('')
    const [loaded, setLoaded] = useState(false);

    // useEffect(() => {
    //     retreivePortrait();
        
    //     //FUNCTIONS
    //     async function retreivePortrait() {
    //         try {
    //             const url = await getImageURL('images','waldo.gif');
    //             setPortraitURL(url);
    //             setLoaded(true);
    //         }
    //         catch(err) {
    //             console.error(err)
    //         }
    //     }
    // }, [getImageURL])

    return (
        <Container as='main' fluid className='d-flex flex-column flex-grow-1 justify-content-center align-items-center px-0 home'>
            <Container fluid className='d-flex flex-column flex-grow-1 justify-content-between'>
                <Container className='d-flex flex-grow-1'>
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
                            <Button variant='danger' className='btn-game'>
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
