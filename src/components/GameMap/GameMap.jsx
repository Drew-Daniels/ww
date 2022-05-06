import { useState, useEffect, useRef } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CustomCursor from '../CustomCursor/CustomCursor';
import Marker from '../Marker/Marker';
import Choices from '../Choices/Choices';

import './GameMap.scss';

export default function GameMap(props) {
    const imageRef = useRef();
    const { loaded, mapImageURL, characters, isComplete } = props;

    const [clWidth, setClWidth] = useState(0);
    const [clHeight, setClHeight] = useState(0);
    // IMAGE
    const [imHeight, setImHeight] = useState(0);
    const [imWidth, setImWidth] = useState(0);
    const [imageMidpoint, setImageMidpoint] = useState(0);
    const [leftBoundary, setLeftBoundary] = useState(0);
    const [topBoundary, setTopBoundary] = useState(0);
    // MARKER
    // marked will be a flag to determine if a pin has been dropped on the map
    const [marked, setMarked] = useState(false);
    // markerX/Y will track the marker image location
    const [markerX, setMarkerX] = useState(0);
    const [markerY, setMarkerY] = useState(0);
    // markerImgX/Y will track where the marker image needs to be RELATIVE to markerX/Y, centering over the exact position
    const [markerImgX, setMarkerImgX] = useState(0);
    const [markerImgY, setMarkerImgY] = useState(0);
    // CHOICES form
    const [choicesX, setChoicesX] = useState(0);
    const [choicesY, setChoicesY] = useState(0);
    // MOUSE
    // mouseX/Y will track the absolute mouse location RELATIVE to the entire HTML page
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    // mouseImgX/Y will track the mouse image location RELATIVE to mouseX/Y, centering the image over the exact position of the mouse on the HTML page
    const [mouseImgX, setMouseImgX] = useState(0);
    const [mouseImgY, setMouseImgY] = useState(0);
    // relX/Y will track the mouse location RELATIVE to map image boundaries
    const [relX, setRelX] = useState(0);
    const [relY, setRelY] = useState(0);
    // absX/Y will track absolute pixel coordinates relative to original image size
    const [absX, setAbsX] = useState(0);
    const [absY, setAbsY] = useState(0);

    /**
     * @param {event} e 
     */
     async function handleMouseMove(e) {
        if (!loaded) return;
        await setBoundaries();
        await setMousePos();
        await setMouseImgPos();
        await setRelPos();
        await setAbsPos();

        /**
         * track left and top boundaries of the image
         */
        async function setBoundaries() {
            const bounds = imageRef.current.getBoundingClientRect();
            Promise.all([
                setLeftBoundary(prevLeftBounds => bounds.left),
                setTopBoundary(prevTopBounds => bounds.top),
            ])
        }
        /**
         * track absolute mouse position on html page
         */
        async function setMousePos() {
            Promise.all([
                setMouseX(prevMouseX => e.pageX),
                setMouseY(prevMouseY => e.pageY),                
            ])
        }
        /**
         * center mouse image over the exact mouse position
         */
        async function setMouseImgPos() {
            Promise.all([
                setMouseImgX(prevMouseImgX => mouseX - 50),
                setMouseImgY(prevMouseImgY => mouseY - 50),
            ])
        }
        /**
         * track mouse coordinates relative to map image boundaries and scrolled distance
         */
        async function setRelPos() {
            Promise.all([
                setRelX(prevRelX => mouseX - leftBoundary - window.scrollX),
                setRelY(prevRelY => mouseY - topBoundary - window.scrollY),
            ])
        }
        /**
         * track absolute mouse coordinates relative to original image dimensions
         */
        async function setAbsPos() {
            Promise.all([
                setAbsX(prevAbsX => relX/clWidth * imWidth),
                setAbsY(prevAbsY => relY/clHeight * imHeight),
            ])
        }
    };

    async function handleClick(e) {
        await setImSize();
        await handleResize();
        await placeMarker();
        placeChoices();

        async function setImSize() {
            Promise.all([
                setImHeight(prevImHeight => imageRef.current.naturalHeight ),
                setImWidth(prevImWidth => imageRef.current.naturalWidth ),
            ]);
        }
        async function handleResize() {
            Promise.all([
                setClHeight(prevClHeight => imageRef.current.clientHeight ),
                setClWidth(prevClWidth => imageRef.current.clientWidth ),
                setImageMidpoint(prevImageMidPoint => imageRef.current.clientWidth / 2),
            ]);
        }
        async function placeMarker() {
            Promise.all([
                setMarkerX(prevMarkerX => absX ),
                setMarkerY(prevMarkerY => absY ),
                setMarkerImgX(prevMarkerImgX => mouseX - 40),
                setMarkerImgY(prevMarkerImgY => mouseY - 40),
                setMarked(true),
            ])
        }

        async function placeChoices() {
            Promise.all([
                setChoicesX(prevChoicesX => { return mouseX < imageMidpoint ? mouseX - 40: mouseX - 350 }),
                setChoicesY(prevChoicesY => { return mouseY - 40 }),
            ])
        }
    };

    /**
     * 
     * NOTE: Stop propogation because if not done, clicking a form button will trigger img click event and drop a marker in the
     * position of the form button clicked.
     * @param {event} e 
     */
    function handleChoiceSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(characters);
        console.log('markerX: ' + markerX)
        console.log('markerY:' + markerY);
        const availableCharacters = getAvailableCharacters(characters);
        console.log(availableCharacters);
        setMarked(prevMarked => false);
        /**
         * Retrieves all the characters in state that have not been found AND have boundaries encompassing the marked coordinate by the user.
         * @param {array of Characters} characters 
         * @returns filtered array of characters
         */
        function getAvailableCharacters(characters) {
            const unfoundCharacters = getUnfoundCharacters(characters)
            const availableCharacters = getInboundsCharacters(unfoundCharacters);
            return availableCharacters;
        }
        /**
         * Retrieves all the characters in state that have not been found
         * @param {array of Characters} characters 
         * @returns filtered array of Characters
         */
        function getUnfoundCharacters(characters) {
            const unfoundCharacters = characters.filter(character => !character.isFound)
            return unfoundCharacters;
        }
        /**
         * Retrieves all the characters in state that have boundaries encompassing the marked coordinate by the user.
         * @param {array of Characters} characters 
         * @returns filtered array of characters
         */
        function getInboundsCharacters(characters) {
            const inboundsCharacters = characters.filter(character => {
                const { x_min, x_max, y_min, y_max } = character;
                return isWithinBounds(markerX, markerY, x_min, x_max, y_min, y_max);
            });
            return inboundsCharacters;
        }
        /**
         * Returns a boolean that denotes whether or not a given point provided (coordinates of [sourceX, sourceY]) fall within the
         * target boundaries of targetXMin, targetXMax, targetYMin, and targetYMax. 
         * @param {integer} sourceX 
         * @param {integer} sourceY 
         * @param {integer} targetXMin 
         * @param {integer} targetXMax 
         * @param {integer} targetYMin 
         * @param {integer} targetYMax 
         * @returns boolean
         */
        function isWithinBounds(sourceX, sourceY, targetXMin, targetXMax, targetYMin, targetYMax) {
            return (
                sourceX >= targetXMin && sourceX <= targetXMax &&
                sourceY >= targetYMin && sourceY <= targetYMax
            )
        }
        function isCorrectCharacter(character, inboundsCharacters) {
            // fill in later
        }
    }

    return (
        <Container as='main' fluid id='game-map' className='d-flex flex-grow-1 justify-content-center align-items-center px-0' onClick={handleClick} onMouseMove={handleMouseMove}>
            {!loaded &&
                <Spinner animation="border" variant="danger" />
            }
            {loaded &&
                    <>
                        <img src={mapImageURL} ref={imageRef} alt='Map' className='game-map-image'  />
                        {!isComplete &&
                            <CustomCursor x={mouseImgX} y={mouseImgY} onMouseMove={handleMouseMove}/>
                        }
                    </>
            }
            {marked &&
                <>
                    <Marker x={markerImgX} y={markerImgY} /> 
                    <Choices x={choicesX} y={choicesY} characters={characters} handleChoiceSubmit={handleChoiceSubmit}/>                
                </>
            }
        </Container>
    )
}
