import { IconContext } from 'react-icons';
import { FcDatabase as DBIcon } from 'react-icons/fc';
import { Spinner } from 'react-bootstrap';

export default function ValidationMessageValidating(props) {

    return (
        <>
            <span className='validating-message'>Validating...</span>
            <IconContext.Provider value={{ size: '1rem'}}>
                <DBIcon />
            </IconContext.Provider>
            <Spinner animation="border" role="status" variant='warning' size='sm' className='validating-icon' />
        </>
    )
}