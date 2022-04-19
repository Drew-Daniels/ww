import { useState } from 'react';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import './Home.scss';

export default function Home(props) {

    const { getImageURL } = useOutletContext();
    const [portraitURL, setPortraitURL] = useState('')
    const [loaded, setLoaded] = useState(false);
    
    retrievePortrait();

    return (
        <Container as='main' fluid className='d-flex flex-column flex-grow-1 justify-content-center align-items-center px-0'>
            <figure className='figure'>
                <div className='frame mb-5'>
                    {!loaded &&
                        <Spinner animation="border" variant="danger" />
                    }
                    {loaded &&
                        <img src={portraitURL} alt="Hieronymus Bosch portrait" figure-img img-fluid rounded />
                    }
                </div>                    
                <blockquote className='blockquote'>
                    {!loaded &&
                        <Placeholder as='p' animation='glow'>
                            <Placeholder xs={10} style={{ marginLeft: '4em' }}/>
                            <Placeholder xs={12} />
                            <Placeholder xs={12} />
                            <Placeholder xs={12} />
                            <Placeholder xs={4} />
                        </Placeholder>
                    }
                    {loaded &&
                        <p className='bio'>
                            Hieronymus Bosch [...] was a Dutch/Netherlandish painter from Brabant.
                            He is one of the most notable representatives of the Early Netherlandish painting school.
                            His work, generally oil on oak wood, mainly contains fantastic illustrations of religious concepts and narratives.
                            Within his lifetime his work was collected in the Netherlands, Austria, and Spain, and widely copied, especially his macabre and nightmarish depictions of hell.
                        </p>
                    }
                </blockquote>
                <figcaption className='blockquote-footer figure-caption text-end'>
                    {!loaded &&
                        <Placeholder as='cite' animation='glow' className='d-flex justify-content-end'>
                            <Placeholder xs={3} />
                        </Placeholder>
                    }
                    {loaded &&
                        <cite title='Wikipedia' href='https://en.wikipedia.org/wiki/Hieronymus_Bosch'>Wikipedia</cite>
                    }
                </figcaption>
            </figure>
        </Container>
    )

    function retrievePortrait() {
        getImageURL('images','hieronymus-bosch-portrait.jfif')
        .then((url) => {
            setPortraitURL(url)
            setLoaded(true);
        })
        .catch((err) => {
            console.error(err)
        });
    }
}
