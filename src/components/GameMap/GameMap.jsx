import { useState, useEffect, useRef } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CustomCursor from '../CustomCursor/CustomCursor';
import Marker from '../Marker/Marker';
import Choices from '../Choices/Choices';

import './GameMap.scss';

export default function GameMap(props) {
    const imageRef = useRef();
    const { loaded, mapImageURL, characters, setCharacters, isComplete, setIsComplete } = props;

    const [selectedCharacter, setSelectedCharacter] = useState(null);
    const [isValidating, setIsValidating] = useState(false);
    const [validated, setValidated] = useState(false);
    const [isValid, setIsValid] = useState(false);

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

    useEffect(() => {
        if (selectedCharacter == null) { return }
        const availableCharacters = getAvailableCharacters(characters);
        var matchedCharacter;
        for (let i=0; i < availableCharacters.length; i++) {
            const character = availableCharacters[i];
            if (character.name === selectedCharacter.name) {
                matchedCharacter = character;
            };
        }
        setIsValidating(prevIsValidating => false);
        setValidated(prevValidated => true);
        setIsValid(prevIsValid => matchedCharacter ? true : false);
        // update characters state
        if (matchedCharacter) {
            const ci = characters.findIndex(ch => ch.name === matchedCharacter.name);
            setCharacters(prevCharacters => prevCharacters.map((ch, i) => {
                if (i === ci) {
                    ch.isFound = true;
                    return ch;
                } else {
                    return ch;
                }
            }))
        } else {
            setSelectedCharacter(null);
        }
        const allCharactersFound = characters.every(function(ch) {
            return ch.isFound === true;
        })
        setIsComplete(prevIsComplete => allCharactersFound);
        setTimeout(() => {
            setMarked(prevMarked => false);
        }, 500)
        /**
         * Retrieves all the characters in state that have not been found AND have boundaries encompassing the marked coordinate by the user.
         * @param {array of Characters} characters 
         * @returns filtered array of characters
         */
        function getAvailableCharacters(characters) {
            const unfoundCharacters = getUnfoundCharacters(characters)
            const availableCharacters = getInboundsCharacters(markerX, markerY, unfoundCharacters);
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
        function getInboundsCharacters(sourceX, sourceY, characters) {
            const inboundsCharacters = characters.filter(character => {
                const { x_min, x_max, y_min, y_max } = character;
                return isWithinBounds(sourceX, sourceY, x_min, x_max, y_min, y_max);
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
    }, [selectedCharacter])

    /**
     * @param {event} e 
     */
    function handleMouseMove(e) {
        if (!loaded) return;
        setImSize();
        handleResize();
        setBoundaries();
        setMousePos();
        setMouseImgPos();
        setRelPos();
        setAbsPos();

        /**
         * TODO: Move this to UseEffect rule to set only on page load.
         */
        function setImSize() {
            setImHeight(prevImHeight => imageRef.current.naturalHeight);
            setImWidth(prevImWidth => imageRef.current.naturalWidth);
        }
        function handleResize() {
            setClHeight(prevClHeight => imageRef.current.clientHeight );
            setClWidth(prevClWidth => imageRef.current.clientWidth );
            setImageMidpoint(prevImageMidPoint => imageRef.current.clientWidth / 2);
        }
        /**
         * track left and top boundaries of the image
         */
        function setBoundaries() {
            const bounds = imageRef.current.getBoundingClientRect();
            setLeftBoundary(prevLeftBounds => bounds.left);
            setTopBoundary(prevTopBounds => bounds.top);
        }
        /**
         * track absolute mouse position on html page
         */
        function setMousePos() {
            setMouseX(prevMouseX => e.pageX);
            setMouseY(prevMouseY => e.pageY);
        }    
        /**
         * center mouse image over the exact mouse position
         */
        function setMouseImgPos() {
            setMouseImgX(prevMouseImgX => mouseX - 50);
            setMouseImgY(prevMouseImgY => mouseY - 50);
        }
        /**
         * track mouse coordinates relative to map image boundaries and scrolled distance
         */
        function setRelPos() {
            setRelX(prevRelX => mouseX - leftBoundary - window.scrollX);
            setRelY(prevRelY => mouseY - topBoundary - window.scrollY);
        }
        /**
         * track absolute mouse coordinates relative to original image dimensions
         */
        function setAbsPos() {
            setAbsX(prevAbsX => relX/clWidth * imWidth);
            setAbsY(prevAbsY => relY/clHeight * imHeight);
        }
    };

    function handleClick(e) {

        placeMarker();
        placeChoices();

        function placeMarker() {
            setMarkerX(prevMarkerX => absX );
            setMarkerY(prevMarkerY => absY );
            setMarkerImgX(prevMarkerImgX => mouseX - 40);
            setMarkerImgY(prevMarkerImgY => mouseY - 40);
            setMarked(true);
        }

        function placeChoices() {
            setChoicesX(prevChoicesX => { return mouseX < imageMidpoint ? mouseX - 40: mouseX - 450 });
            setChoicesY(prevChoicesY => { return mouseY - 40 });
        }
    };

    function handleCharacterSelect(character) {
        setIsValidating(prevIsValidating => true);
        setSelectedCharacter(prevSelectedCharacter => character);
    }

    return (
        <Container as='main' fluid id='game-map' className='d-flex flex-grow-1 justify-content-center align-items-center px-0' onClick={handleClick} onMouseMove={handleMouseMove}>
            {!loaded &&
                <Spinner animation="border" variant='danger' />
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
                    <Choices 
                        x={choicesX} 
                        y={choicesY} 
                        characters={characters} 
                        handleCharacterSelect={handleCharacterSelect} 
                        isValidating={isValidating} 
                        validated={validated}
                        isValid={isValid} 
                    />                
                </>
            }
        </Container>
    )
}
