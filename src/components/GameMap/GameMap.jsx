import { useState, useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CustomCursor from '../CustomCursor/CustomCursor';
import Choices from '../Choices/Choices';
import { getImageURL } from '../../helpers/storHelpers';
import { doc, getDoc } from 'firebase/firestore';

import './GameMap.scss';

export default function GameMap(props) {

    const { loaded, mapImageURL, characters } = props;
    const [clicked, setClicked] = useState(false);
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    function handleClick(e) {
        setClicked(true);
    };

    function handleMouseMove(e) {
        setX(prevState => { return e.pageX - 64});
        setY(prevState => { return e.pageY - 64});
        setClicked(prevState => {return false})
    };

    function handleChoiceSubmit(e) {
        e.preventDefault();
        console.log('current x: ' + x);
        console.log('current y: ' + y);
        const nearbyCharacters = characters.filter(character => {
            const { x_min, x_max, y_min, y_max } = character;
            return isWithinBounds(x, y, x_min, x_max, y_min, y_max);
        });
        console.log(nearbyCharacters);
        function isWithinBounds(sourceX, sourceY, targetXMin, targetXMax, targetYMin, targetYMax) {
            return (
                sourceX >= targetXMin && sourceX <= targetXMax &&
                sourceY >= targetYMin && sourceY <= targetYMax
            )
        }
    }

    return (
        <Container as='main' fluid id='game-map' className='d-flex flex-grow-1 justify-content-center align-items-center' onClick={handleClick}>
            {!loaded &&
                <Spinner animation="border" variant="danger" />
            }
            {loaded &&
                    <>
                        <img src={mapImageURL} alt='Map' className='game-map-image' onMouseMove={handleMouseMove} />
                        <CustomCursor x={x} y={y} />
                    </>
            }
            {clicked &&
                <Choices x={x} y={y} characters={characters} handleChoiceSubmit={handleChoiceSubmit} />
            }

        </Container>
    )
}
