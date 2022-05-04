import { useState, useEffect, useRef } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import CustomCursor from '../CustomCursor/CustomCursor';
import Marker from '../Marker/Marker';
import Choices from '../Choices/Choices';

import './GameMap.scss';

export default function GameMap(props) {

    const imageRef = useRef();

    const { loaded, mapImageURL, characters } = props;
    const [imageHeight, setImageHeight] = useState(0);
    const [imageWidth, setImageWidth] = useState(0);
    const [imageMidpoint, setImageMidpoint] = useState(0);

    const [clicked, setClicked] = useState(false);
    const [marked, setMarked] = useState(false);
    // imageX and imageY track the click coordinates RELATIVE TO the map.
    const [imageX, setImageX] = useState(0);
    const [imageY, setImageY] = useState(0);
    // clickX and clickY track ACTUAL mouse coordinates
    const [clickX, setClickX] = useState(0);
    const [clickY, setClickY] = useState(0);
    
    const [markerX, setMarkerX] = useState(0);
    const [markerY, setMarkerY] = useState(0);

    const [choicesX, setChoicesX] = useState(0);
    const [choicesY, setChoicesY] = useState(0);
    // mouseX and mouseY track the starting point for the top-left corner of the custom cursor, using an offset of
    // 64px up and to the left to center the custom cursor over the point clicked
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);


    function handleClick(e) {
        setImageHeight(prevImageHeight => imageRef.current.clientHeight );
        setImageWidth(prevImageWidth => imageRef.current.clientWidth );
        setImageMidpoint(prevImageMidPoint => imageRef.current.clientWidth / 2)
        setImageX(prevImageX => e.clientX);
        setImageY(prevImageY => e.clientY);
        setClicked(true);
        setMarkerX(prevMarkerX => { return clickX - 40 });
        setMarkerY(prevMarkerY => { return clickY - 40 });
        setChoicesX(prevChoicesX => 
            // if on the left side of the image, offset to the right
            // if on the right side of the image, offset to the left
            { return clickX < imageMidpoint ? clickX - 40: clickX - 350 });
        setChoicesY(prevChoicesY => { return clickY - 40 });
        setMarked(true);
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
        setClickX(prevClickX => { return e.pageX });
        setClickY(prevClickY => { return e.pageY });
        setMouseX(prevMouseX => { return clickX - 50});
        setMouseY(prevMouseY => { return clickY - 50});
        setImageX(prevImageX => { return e.clientX });
        setImageY(prevImageY => { return e.clientY });
        setClicked(prevClicked => {return false});
    };

    function handleChoiceSubmit(e) {
        e.preventDefault();
        e.stopPropagation();
        console.log('clickX: ' + clickX);
        console.log('clickY: ' + clickY);
        console.log('imageX: ' + imageX);
        console.log('imageY: ' + imageY);
        console.log('imageHeight: ' +  imageHeight)
        console.log('imageWidth: ' + imageWidth)
        const inboundsCharacters = characters.filter(character => {
            const { x_min, x_max, y_min, y_max } = character;
            return isWithinBounds(imageX, imageY, x_min, x_max, y_min, y_max);
        });
        console.log(inboundsCharacters);
        function isWithinBounds(sourceX, sourceY, targetXMin, targetXMax, targetYMin, targetYMax) {
            return (
                sourceX >= targetXMin && sourceX <= targetXMax &&
                sourceY >= targetYMin && sourceY <= targetYMax
            )
        }
    }

    return (
        <Container as='main' fluid id='game-map' className='d-flex flex-grow-1 justify-content-center align-items-center' onClick={handleClick} onMouseMove={handleMouseMove}>
            {!loaded &&
                <Spinner animation="border" variant="danger" />
            }
            {loaded &&
                    <>
                        <img src={mapImageURL} ref={imageRef} alt='Map' className='game-map-image'  />
                        <CustomCursor x={mouseX} y={mouseY} />
                    </>
            }
            {marked &&
                <>
                    <Marker x={markerX} y={markerY} /> 
                    <Choices x={choicesX} y={choicesY} characters={characters} handleChoiceSubmit={handleChoiceSubmit} />                
                </>
            }
        </Container>
    )
}
