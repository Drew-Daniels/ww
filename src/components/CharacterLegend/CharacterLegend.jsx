import { useState } from 'react';
import { Container } from 'react-bootstrap';
import './CharacterLegend.scss';

export default function CharacterLegend(props) {

    return (
        <Container fluid className='d-flex flex-grow-1 justify-content-center align-items-center'>
            characters will go here
        </Container>
    )

    async function getCharacterImages() {
        // get Character images from Firebase Storage
    }
}
