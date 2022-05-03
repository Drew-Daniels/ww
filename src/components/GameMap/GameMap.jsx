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
        // get the character data from the Choice form submitted, and determine if any characters have coordinates around the area the user clicked
        console.log('current x: ' + x);
        console.log('current y: ' + y);
        const nearbyCharacters = characters.filter(character => isNearby(character, 150));
        console.log(nearbyCharacters);
        
        /**
         * Returns true if current x, y state variables are close
         * @param {[Character object]} character 
         * @param {integer} threshold 
         * @returns 
         */
        function isNearby(character, threshold) {
            return ((getDistFromCharacter('x', character) <= threshold) && (getDistFromCharacter('y', character) <= threshold));
        }
        /**
         * Returns the distance (in pixels) between the current x, y state variables (determined by 'sourceAxis') against those of a given character.
         * @param {string} sourceAxis - Axis that you want to use to compare against character axis points
         * @param {[Character object]} character 
         * @returns number
         */
        function getDistFromCharacter(sourceAxis, character) {
            var currentSourceAxisPoint;
            if (sourceAxis === 'x') {
                currentSourceAxisPoint = x;
            } else {
                currentSourceAxisPoint = y;
            }
            console.log('character ' + sourceAxis + ': ' + character[sourceAxis])
            var res = Math.abs(currentSourceAxisPoint - character[sourceAxis]);
            console.log('difference: ' + res);
            return res;
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
