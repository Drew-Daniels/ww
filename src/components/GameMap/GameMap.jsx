import { useState, useEffect, useRef } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CustomCursor from '../CustomCursor/CustomCursor';
import Marker from '../Marker/Marker';
import Choices from '../Choices/Choices';

import './GameMap.scss';

export default function GameMap(props) {
    const imageRef = useRef();
    const { loaded, mapImageURL, characters } = props;

    // track the height and width of the client
    const [clWidth, setClWidth] = useState(0);
    const [clHeight, setClHeight] = useState(0);
    // track the height and width of the image in CSS pixels
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
    // mouseImgX/Y will track the mouse image location RELATIVE to mouseX/Y, centering the image over the exact position
    const [mouseImgX, setMouseImgX] = useState(0);
    const [mouseImgY, setMouseImgY] = useState(0);
    // relX/Y will track the mouse location RELATIVE to map image boundaries
    const [relX, setRelX] = useState(0);
    const [relY, setRelY] = useState(0);
    // absX/Y will track absolute pixel coordiantes relative to original image size
    const [absX, setAbsX] = useState(0);
    const [absY, setAbsY] = useState(0);

    // mouseX and mouseY track the starting point for the top-left corner of the custom cursor, using an offset of
    // 64px up and to the left to center the custom cursor over the point clicked
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    // useEffect(() => {
    //     console.log('left: ' + leftBoundary);
    //     console.log('top: ' + topBoundary);
    //     console.log('relX: ' + relX);
    //     console.log('relY: ' + relY);
    //     console.log('absX: ' + absX);
    //     console.log('absY: ' + absY);
    // }, [relX, relY, absX, absY, leftBoundary, topBoundary])

    // useEffect(() => {
    //     console.log('leftBoundary: ' + leftBoundary);
    //     console.log('topBoundary: ' + topBoundary);
    // }, [leftBoundary, topBoundary])
    // useEffect(() => {
    //     console.log('relX: ' + relX);
    //     console.log('relY: ' + relY);
    // }, [relX, relY])
    // useEffect(() => {
    //     console.log('markerX: ' + markerX);
    //     console.log('markerY: ' + markerY);
    // }, [markerX, markerY])

    // useEffect(() => {
    //     console.log('absX: ' + absX);
    //     console.log('absY: ' + absY);
    // }, [absX, absY])
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


    function handleChoiceSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log(characters);
        console.log('markerX: ' + markerX)
        console.log('markerY:' + markerY);
        const inboundsCharacters = characters.filter(character => {
            const { x_min, x_max, y_min, y_max } = character;
            return isWithinBounds(markerX, markerY, x_min, x_max, y_min, y_max);
        });
        console.log(inboundsCharacters);
        setMarked(prevMarked => false);

        function isWithinBounds(sourceX, sourceY, targetXMin, targetXMax, targetYMin, targetYMax) {
            return (
                sourceX >= targetXMin && sourceX <= targetXMax &&
                sourceY >= targetYMin && sourceY <= targetYMax
            )
        }
        function isCorrectCharacter() {
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
                        <CustomCursor x={mouseImgX} y={mouseImgY} onMouseMove={handleMouseMove}/>
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
