import { IconContext } from 'react-icons';
import { FcDatabase as DBIcon } from 'react-icons/fc';
import { RiCloseCircleFill as InvalidIcon } from 'react-icons/ri'

import './ValidationMessageInvalid.scss';

export default function ValidationMessageInvalid(props) {

    return (
        <>
            <span className='validating-message'>No dice...</span>
            <IconContext.Provider value={{ size: '2rem'}}>
                <DBIcon/>
            </IconContext.Provider>
            <IconContext.Provider value={{ size: '1rem', color: 'red' }}>
                <InvalidIcon className='validating-icon'/>
            </IconContext.Provider>
        </>
    )
}