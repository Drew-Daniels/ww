import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import './Home.scss';

export default function Home(props) {

    const { getImageURL } = useOutletContext();
    const [portraitURL, setPortraitURL] = useState('')
    getImageURL('images','hieronymus-bosch-portrait.jfif')
        .then((url) => {
            setPortraitURL(url)
        })
        .catch((err) => {
            console.error(err)
        });

    return (
        <Container as='main' fluid className='d-flex flex-column flex-grow-1 justify-content-center align-items-center px-0'>
            <div>
                <img src={portraitURL} alt="" />
            </div>

        </Container>
    )
}
