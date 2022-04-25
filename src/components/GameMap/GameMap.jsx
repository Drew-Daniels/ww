import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CustomCursor from '../CustomCursor/CustomCursor';
import Choices from '../Choices/Choices';
import { getImageURL } from '../../helpers/storHelpers';

import './GameMap.scss';

export default function GameMap(props) {

    const { mapId } = props;

    const [map, setMap] = useState({
        id: mapId,
        fileName: mapId + '.jpg',
    });
    const [arenaURL, setArenaURL] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    function handleClick(e) {
        setClicked(true);
    }

    function handleMouseMove(e) {
        setX(prevState => { return e.pageX - 64});
        setY(prevState => { return e.pageY - 64});
        setClicked(prevState => {return false})
    }

    useEffect(() => {
        retreiveArena();

        // FUNCTION DEFINITIONS 
        async function retreiveArena() {
            const url = await getImageURL('maps', map.fileName);
            setArenaURL(url);
            setLoaded(true);
        }
    }, [map.fileName])

    return (
        <Container as='main' fluid id='game-map' className='d-flex flex-grow-1 justify-content-center align-items-center' onClick={handleClick}>
            {!loaded &&
                <Spinner animation="border" variant="danger" />
            }
            {loaded &&
                    <>
                        <img src={arenaURL} alt='The Garden of Earthly Delights triptych' className='game-map-image' onMouseMove={handleMouseMove} />
                        <CustomCursor x={x} y={y} />
                    </>
            }
            {clicked &&
                <Choices x={x} y={y} />
            }

        </Container>
    )
}
