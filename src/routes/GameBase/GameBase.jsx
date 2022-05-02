import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import './GameBase.scss';

export default function GameBase(props) {

    const { db } = props;

    return (
        <Container fluid className='d-flex flex-column flex-grow-1'>
            <Outlet context={{ db: db }}/>
        </Container>
    )
}
