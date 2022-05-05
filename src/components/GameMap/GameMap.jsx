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
    const [imHeight, setImHeight] = useState(0);
    const [imWidth, setImWidth] = useState(0);

    const [imageMidpoint, setImageMidpoint] = useState(0);
    const [leftBoundary, setLeftBoundary] = useState(0);
    const [topBoundary, setTopBoundary] = useState(0);
    const [marked, setMarked] = useState(false);

    const [pageX, setPageX] = useState(0);
    const [pageY, setPageY] = useState(0);
    
    const [markerX, setMarkerX] = useState(0);
    const [markerY, setMarkerY] = useState(0);

    const [choicesX, setChoicesX] = useState(0);
    const [choicesY, setChoicesY] = useState(0);
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
    //     window.addEventListener('resize', handleResize);
    //     setInitialImageSize();

    //     function handleResize() {
    //         const bounds = imageRef.current.getBoundingClientRect();
    //         setClHeight(prevClHeight => imageRef.current.clientHeight );
    //         setClWidth(prevClWidth => imageRef.current.clientWidth );
    //         setImageMidpoint(prevImageMidPoint => imageRef.current.clientWidth / 2)
    //         setLeftBoundary(prevLeftBounds => bounds.left);
    //         setTopBoundary(prevTopBounds => bounds.top);
    //     }
    //     function setInitialImageSize() {
    //         setImHeight(prevImHeight => imageRef.current.naturalHeight );
    //         setImWidth(prevImWidth => imageRef.current.naturalWidth );
    //     }
    // }, [])

    useEffect(() => {
        console.log('left: ' + leftBoundary);
        console.log('top: ' + topBoundary);
        console.log('relX: ' + relX);
        console.log('relY: ' + relY);
        console.log('absX: ' + absX);
        console.log('absY: ' + absY);
    }, [relX, relY, absX, absY, leftBoundary, topBoundary])

    function handleClick(e) {

        handleResize();
        setInitialImageSize();

        setMarkerX(prevMarkerX => { return relX - 40 });
        setMarkerY(prevMarkerY => { return relY - 40 });
        setChoicesX(prevChoicesX => { return relX < imageMidpoint ? relX - 40: relX - 350 });
        setChoicesY(prevChoicesY => { return relX - 40 });
        setMarked(true);

        function handleResize() {
            setClHeight(prevClHeight => imageRef.current.clientHeight );
            setClWidth(prevClWidth => imageRef.current.clientWidth );
            setImageMidpoint(prevImageMidPoint => imageRef.current.clientWidth / 2)

        }
        function setInitialImageSize() {
            setImHeight(prevImHeight => imageRef.current.naturalHeight );
            setImWidth(prevImWidth => imageRef.current.naturalWidth );
        }
    };

    /**
     * Ensures the custom Mouse cursor is correctly centered over the current mouse position.
     * 64px is the x, y offset used because the total image size is 128px x 128px and we want the custom cursor to be centered over the actual mouse coordinates (i.e., pageX and pageY without the offset)
     * From MDN:
     * "The pageX read-only property of the MouseEvent interface returns the X (horizontal) coordinate (in pixels) at which the mouse was clicked, relative to the left edge of the entire document." 
     * "The pageY read-only property of the MouseEvent interface returns the Y (vertical) coordinate in pixels of the event relative to the whole document. This property takes into account any vertical scrolling of the page."
     * @param {event} e 
     */
    function handleMouseMove(e) {
        const bounds = imageRef.current.getBoundingClientRect();
        setLeftBoundary(prevLeftBounds => bounds.left);
        setTopBoundary(prevTopBounds => bounds.top);
        // track absolute mouse position on html page
        setMouseX(prevMouseX => e.pageX);
        setMouseY(prevMouseY => e.pageY);
        // center mouse image over the exact position
        setMouseImgX(prevMouseImgX => mouseX - 50);
        setMouseImgY(prevMouseImgY => mouseY - 50);
        // track mouse coordinates relative to map image boundaries and scrolled distance
        // window.scrollX omitted on relX because the image will always take up 100% width of the viewport and will never be scrollable
        setRelX(prevRelX => mouseX - leftBoundary);
        setRelY(prevRelY => mouseY - topBoundary - window.scrollY);
        // track absolute mouse coordinates relative to original image dimensions
        setAbsX(prevAbsX => relX/clWidth * imWidth);
        setAbsY(prevAbsY => relY/clWidth * imHeight);
    };

    function handleChoiceSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        const inboundsCharacters = characters.filter(character => {
            const { x_min, x_max, y_min, y_max } = character;
            return isWithinBounds(absX, absY, x_min, x_max, y_min, y_max);
        });
        console.log(inboundsCharacters);
        
        setMarked(prevMarked => false);

        function isWithinBounds(sourceX, sourceY, targetXMin, targetXMax, targetYMin, targetYMax) {
            return (
                sourceX >= targetXMin && sourceX <= targetXMax &&
                sourceY >= targetYMin && sourceY <= targetYMax
            )
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
                        <CustomCursor x={mouseImgX} y={mouseImgY} />
                    </>
            }
            {marked &&
                <>
                    <Marker x={markerX} y={markerY} /> 
                    <Choices x={choicesX} y={choicesY} characters={characters} handleChoiceSubmit={handleChoiceSubmit}/>                
                </>
            }
        </Container>
    )
}
