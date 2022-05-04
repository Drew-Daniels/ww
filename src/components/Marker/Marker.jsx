import './Marker.scss';

export default function Marker(props) {

    const { x, y } = props;

    return (
        <div className='marker' style={{ left: `${x}px`, top: `${y}px` }}/>
    )
}