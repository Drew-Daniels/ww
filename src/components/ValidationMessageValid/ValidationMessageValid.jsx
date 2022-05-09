import { IconContext } from 'react-icons';
import { RiCheckboxCircleFill as ValidIcon } from 'react-icons/ri';
import { FcDatabase as DBIcon } from 'react-icons/fc';
import './ValidationMessageValid.scss';

export default function ValidationMessageValid(props) {

    return (
        <>
            <span className='validating-message'>Found em'!</span>
            <IconContext.Provider value={{ size: '2rem'}}>
                <DBIcon />
            </IconContext.Provider>
            <IconContext.Provider value={{ size: '1rem', color: 'green' }}>
                <ValidIcon className='validating-icon' />
            </IconContext.Provider>
        </>
    )
}