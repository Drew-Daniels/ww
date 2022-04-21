import { Container } from 'react-bootstrap';
import CharacterLegend from '../CharacterLegend/CharacterLegend';
import Timer from '../Timer/Timer';
import './SideBar.scss';

export default function SideBar(props) {

    return (
        <Container className='d-flex flex-column mt-2'>
            <Timer />
            <CharacterLegend />
        </Container>
    )
}
