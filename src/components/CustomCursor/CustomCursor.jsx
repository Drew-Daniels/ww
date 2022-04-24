import './CustomCursor.scss';

export default function CustomCursor(props) {

    const { x, y } = props;
    return (
        <div className='custom-cursor' style={{ left: `${x}px`, top: `${y}px` }} />
    )
}