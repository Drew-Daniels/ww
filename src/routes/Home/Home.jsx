import { useState, useEffect } from 'react';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import './Home.scss';

export default function Home(props) {

    const { getImageURL } = useOutletContext();
    const [portraitURL, setPortraitURL] = useState('')
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        retreivePortrait();
        
        //FUNCTIONS
        async function retreivePortrait() {
            try {
                const url = await getImageURL('images','waldo.gif');
                setPortraitURL(url);
                setLoaded(true);
            }
            catch(err) {
                console.error(err)
            }
        }
    }, [getImageURL])

    return (
        <Container as='main' fluid className='d-flex flex-column flex-grow-1 justify-content-center align-items-center px-0'>
            <Container fluid className='d-flex flex-column flex-grow-1 justify-content-between'>
                <h1 className='text-center'>Welcome!</h1>
                <div className='d-flex flex-grow-1 justify-content-center align-items-center mb-5'>
                    {!loaded &&
                        <Spinner animation="border" variant="danger" />
                    }
                    {loaded &&
                        <img src={portraitURL} alt="Hieronymus Bosch portrait" className='waldo-image' />
                    }
                </div>                    
                <div className='d-flex justify-content-center'>
                    {!loaded &&
                        <Placeholder as='p' animation='glow' className='d-flex flex-grow-1'>
                            <Placeholder xs={12} />
                        </Placeholder>
                    }
                    {loaded &&
                        <p className='welcome-message'>
                            This is a Where's Waldo game that uses Egor Klyuchnyk's artwork. His portfolio can be found at
                            {' '}
                            <a href="https://www.behance.net/Chekavo">Behance</a>
                            {' and '}
                            <a href="https://www.artstation.com/chekavo">Artstation</a>
                            .
                        </p>
                    }
                </div>
            </Container>
        </Container>
    )
}
