import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import SideBar from "../SideBar/SideBar";
import GameMap from '../GameMap/GameMap';

import './GameArena.scss';

export default function GameArena(props) {

    const { mapId } = useParams();

    return (
        <>
            {/* <Row className='d-flex p-2'>
                <SideBar mapId={mapId} />
            </Row> */}
            <Row className='flex-grow-1 p-2'>
                <GameMap mapId={mapId} className='flex-grow-1'/>    
            </Row>
        </>
    )
}