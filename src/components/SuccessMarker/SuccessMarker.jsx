import { IconContext } from 'react-icons';
import { FaCheckCircle as SuccessMarkerIcon } from 'react-icons';
import './SuccessMarker.scss';

export default function SuccessMarker(props) {

    return (
        <IconContext.Provider value={{ size: '2em' }}>
            <SuccessMarkerIcon />
        </IconContext.Provider>
    )
}
