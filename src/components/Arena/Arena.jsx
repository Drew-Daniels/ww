import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { getImageURL } from '../../helpers/storHelpers';

import './Arena.scss';

export default function Arena(props) {

    const [arenaURL, setArenaURL] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        retreiveArena()

        // FUNCTION DEFINITIONS 
        async function retreiveArena() {
            const url = await getImageURL('maps', 'the-garden-of-earthly-delights.jpg');
            setArenaURL(url);
            setLoaded(true);
        }
    }, [])

    return (
        <Container as='main' fluid className='d-flex flex-grow-1 justify-content-center align-items-center custom-cursor'>
            {!loaded &&
                <Spinner animation="border" variant="danger" />
            }
            {loaded &&
                <img src={arenaURL} alt='The Garden of Earthly Delights triptych' className='arena-image'/>
            }
        </Container>
    )
}
