import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { ImEnter as PlayIcon } from 'react-icons/im';
import { Container, Card, Spinner, Placeholder, Button } from 'react-bootstrap';
import { getImageURL } from '../../helpers/storHelpers';
import { Link } from "react-router-dom"

import './GameChoices.scss';

export default function GameChoices(props) {

    const [loaded, setLoaded] = useState(false);
    const [map1URL, setMap1URL] = useState('');
    const [map2URL, setMap2URL] = useState('');

    useEffect(() => {
        setup();

        // Function Definitions
        async function setup() {
            await Promise.all([
                setMapURL(1),
                setMapURL(2),
            ]);
            setLoaded(true);
        }
        async function setMapURL(mapId) {
            const setterFn = (mapId === 1 ? setMap1URL : setMap2URL);
            const id = String(mapId);
            const url = await getImageURL('maps', id + '.jpg');
            setterFn(url);
        }
    }, [])

    return (
        <Container fluid className='d-flex flex-grow-1'>
            <Card className='d-flex flex-grow-1 m-5 map-choice-card'>
                <Card.Title className='text-center'>{'Map name here'}</Card.Title>
                <div className='d-flex flex-column flex-grow-1 justify-content-center align-items-center'>
                    {!loaded &&
                        <Spinner animation="border" variant="danger" className='map-choice' />
                    }
                    {loaded &&
                        <Card.Img
                            src={map1URL}
                            alt='Map 1'
                            className='map-choice-image'
                        />
                    }
                </div>
                <Card.Body className='d-flex flex-column flex-grow-1 justify-content-end align-items-center'>
                    <Link to='1' className='btn btn-danger btn-game-choice'>
                        <span>Play</span>
                        {' '}
                        <IconContext.Provider value={{ size: '1em' }}>
                            <PlayIcon />
                        </IconContext.Provider>
                    </Link>
                </Card.Body>
            </Card>
            <Card className='d-flex flex-grow-1 m-5 map-choice-card'>
                <Card.Title className='text-center'>{'Map name here'}</Card.Title>
                <div className='d-flex flex-column flex-grow-1 justify-content-center align-items-center'>
                    {!loaded &&
                        <Spinner animation="border" variant="danger" className='map-choice' />
                    }
                    {loaded &&
                        <Card.Img
                            src={map2URL}
                            alt='Map 2'
                            className='map-choice-image'
                        />
                    }
                </div>
                <Card.Body className='d-flex flex-column flex-grow-1 justify-content-end align-items-center'>
                    <Link to='2' className='btn btn-danger btn-game-choice'>
                        <span>Play</span>
                        {' '}
                        <IconContext.Provider value={{ size: '1em' }}>
                            <PlayIcon />
                        </IconContext.Provider>
                    </Link>
                </Card.Body>
            </Card>
        </Container>
    )
}
