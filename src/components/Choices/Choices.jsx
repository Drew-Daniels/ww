import { Form, Button } from 'react-bootstrap';
import './Choices.scss';

export default function Choices(props) {

    const { x, y } = props;

    return (
        <Form className='choices' style={{ left: `${x}`, top: `${y}`}} >
            <Button type='submit' value='character-1'>Character 1</Button>
            <Button type='submit' value='character-2'>Character 2</Button>
            <Button type='submit' value='character-3'>Character 3</Button>
            <Button type='submit' value='character-4'>Character 4</Button>
        </Form>
    )
}
