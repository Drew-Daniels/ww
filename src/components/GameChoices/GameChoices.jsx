import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { ImEnter as PlayIcon } from 'react-icons/im';
import { Container, Card, Spinner, Placeholder, Button } from 'react-bootstrap';
import { getImageURL } from '../../helpers/storHelpers';
import { Link } from "react-router-dom"
import { GameFactory } from '../../helpers/factories';
import { addGame } from '../../helpers/dbHelpers';

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
    }, []);

    return (
        <Container fluid className='d-flex flex-grow-1 justify-content-around'>
            <Link to='1' className='d-flex flex-grow-1'>
                <Card className='d-flex flex-grow-1 map-choice-card'>
                    <Card.Header className='text-center'>
                        <div className='btn btn-danger'>
                            <span className='text-decoration-none'>Ultimate Space Battle</span>
                        </div>
                    </Card.Header>
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
                </Card>
            </Link>
            <Link to='2' className='d-flex flex-grow-1' >
                <Card className='d-flex flex-grow-1 map-choice-card'>
                    <Card.Header className='text-center'>
                        <div className='btn btn-danger'>
                            <span className='text-decoration-none'>Ultimate Space Battle</span>
                        </div>
                    </Card.Header>
                    <Card.Body className='d-flex flex-column flex-grow-1 justify-content-center align-items-center'>
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
                    </Card.Body>
                </Card>
            </Link>
        </Container>
    )
}
