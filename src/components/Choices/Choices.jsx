import { Form, Button } from 'react-bootstrap';
import './Choices.scss';

export default function Choices(props) {

    const { x, y } = props;

    return (
        <Form className='choices' style={{ left: `${x + 128}px`, top: `${y}px`}} >
            <Button type='submit' value='character-1' className='btn-base' >Character 1</Button>
            <Button type='submit' value='character-2' className='btn-base'>Character 2</Button>
            <Button type='submit' value='character-3' className='btn-base'>Character 3</Button>
            <Button type='submit' value='character-4' className='btn-base'>Character 4</Button>
        </Form>
    )
}
