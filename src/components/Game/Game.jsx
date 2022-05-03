import { useParams } from "react-router-dom";
import { Row } from "react-bootstrap";
import StatusBar from "../StatusBar/StatusBar";
import GameMap from '../GameMap/GameMap';
import { getImageURL } from "../../helpers/storHelpers";
import { useState, useEffect, useRef } from "react";
import { query, where, getDocs, collection } from 'firebase/firestore';

import './Game.scss';

class Character {
    constructor(name, difficulty, x, y, imgURL) {
        this.name = name;
        this.difficulty = difficulty;
        this.x = x;
        this.y = y;
        this.imgURL = imgURL;
        this.isFound = false;
    }
}

/**
 * 
 * @param {*} props 
 * @returns 
 */
export default function Game(props) {
    const { db } = props;
    const { mapIdParam } = useParams();
    
    const [mapId, setMapId] = useState(parseInt(mapIdParam));
    const [mapName, setMapName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [username, setUsername] = useState('');
    const [duration, setDuration] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    
    const [mapImageURL, setMapImageURL] = useState('');
    const [loaded, setLoaded] = useState(false);

    // Initial setup
    useEffect(() => {
        setup();

        async function setup() {
            await Promise.all([
                loadMapImage(),
                loadMapData(),
                loadCharacters(),
            ]);
            setLoaded(true);
        };

        async function loadMapData() {
            const mapName = mapId === 1 ? 'Robot City': 'Ultimate Space Battle';
            setMapName(mapName);
            return true;
        }

        async function loadMapImage() {
            const url = await getImageURL('maps', mapIdParam + '.jpg');
            setMapImageURL(url);
            return true;
        };

        async function loadCharacters() {
            const mapsRef = collection(db, 'maps');
            const mapQuery = query(mapsRef, where('name', '==', mapName));
            const mapSnap = await getDocs(mapQuery);
            const characters = [];
            mapSnap.forEach(async (doc) => {
                const charactersRef = collection(doc.ref, 'characters');
                const charactersDocs = await getDocs(charactersRef);
                charactersDocs.forEach(async (doc) => {
                    const characterData = doc.data();
                    const characterImgURL = await getImageURL('characters', characterData.name + '.gif');
                    const character = new Character(characterData.name, characterData.difficulty, characterData.coordinates.x, characterData.coordinates.y, characterImgURL);
                    characters.push(character);
                });
            })
            setCharacters(characters);
            return true;
        };
    }, [db, mapIdParam, mapId, mapName])

    // timer logic - https://overreacted.io/making-setinterval-declarative-with-react-hooks/
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
                    mapImageURL={mapImageURL} 
                    characters={characters} 
                    className='flex-grow-1'
                />    
            </Row>
        </>
    )
}