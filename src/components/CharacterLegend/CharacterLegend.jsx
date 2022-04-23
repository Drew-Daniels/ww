import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import './CharacterLegend.scss';

export default function CharacterLegend(props) {

    // useEffect(() => {
    //     getCharacterImages();

    //     // FUNCTION DEFINITIONS
    //     async function getCharacterImages() {
    //         // get Character images from Firebase Storage

    //     }
    // }, [])

    return (
        <Container fluid className='d-flex flex-grow-1 justify-content-center align-items-center'>
            characters will go here
        </Container>
    )


}
