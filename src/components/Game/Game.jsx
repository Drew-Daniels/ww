import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import StatusBar from "../StatusBar/StatusBar";
import GameMap from '../GameMap/GameMap';
import { addGame } from "../../helpers/dbHelpers";
import { getImageURL } from "../../helpers/storHelpers";
import { useState, useEffect, useRef } from "react";
import { GameFactory } from "../../helpers/factories";
import { useOutletContext } from "react-router-dom";
import './Game.scss';

/**
 * 
 * @param {*} props 
 * @returns 
 */
export default function Game(props) {
    const { mapIdParam } = useParams();
    const { db } = useOutletContext();
    
    const [mapId, setMapId] = useState(parseInt(mapIdParam));
    const [characters, setCharacters] = useState([]);
    const [username, setUsername] = useState('');
    const [duration, setDuration] = useState(null);
    const [isComplete, setIsComplete] = useState(false);
    
    const [mapImageURL, setMapImageURL] = useState('');
    const [loaded, setLoaded] = useState(false);

    // Initial setup
    useEffect(() => {
        setup();

        async function setup() {
            await Promise.all([
                getMap(),
                getCharacters(),
            ]);
            setLoaded(true);
        };

        async function getMap() {
            const url = await getImageURL('maps', mapIdParam + '.jpg');
            setMapImageURL(url);
            return true;
        };

        async function getCharacters() {
            // const mapRef = doc(db, 'maps', String(map.id));
            // const mapSnap = await getDoc(mapRef);
            // const mapCharacters = await mapSnap.get('characters');
            // console.log(mapCharacters);
            // setCharacters()
            return true;
        };
    }, [mapIdParam])

    useInterval(() => {
        setDuration(duration + 1);
    }, 1000)

    function useInterval(cb, delay) {
        const savedCb = useRef();

        useEffect(() => {
            savedCb.current = cb;
        }, [cb]);

        useEffect(() => {
            function tick() {
                savedCb.current();
            }
            if (delay !== null) {
                let id = setInterval(tick, delay);
                return () => clearInterval(id)
            }
        }, [delay]);
    }

    return (
        <>
            <Row className='d-flex p-2'>
                <StatusBar 
                    loaded={loaded}
                    duration={duration}
                    characters={characters} 
                />
            </Row>
            <Row className='flex-grow-1 p-2'>
                <GameMap 
                    loaded={loaded}
                    db={db} 
                    mapImageURL={mapImageURL} 
                    characters={characters} 
                    className='flex-grow-1'
                />    
            </Row>
        </>
    )
}