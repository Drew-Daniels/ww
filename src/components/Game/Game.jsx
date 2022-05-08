import { useParams, useNavigate } from "react-router-dom";
import { Row } from "react-bootstrap";
import StatusBar from "../StatusBar/StatusBar";
import GameMap from '../GameMap/GameMap';
import LeaderboardsForm from '../LeaderboardsForm/LeaderboardsForm';
import { GameFactory } from '../../helpers/factories';
import { saveGame } from "../../helpers/dbHelpers";
import { getImageURL } from "../../helpers/storHelpers";
import { useState, useEffect, useRef } from "react";
import { query, where, getDocs, collection } from 'firebase/firestore';

import './Game.scss';
import DBValidationModal from "../DBValidationModal/DBValidationModal";

class Character {
    constructor(name, difficulty, x_min, x_max, y_min, y_max, imgURL) {
        this.name = name;
        this.difficulty = difficulty;
        this.x_min = x_min;
        this.x_max = x_max;
        this.y_min = y_min;
        this.y_max = y_max;
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
    const navigate = useNavigate();
    
    const [mapId, setMapId] = useState(parseInt(mapIdParam));
    const [mapName, setMapName] = useState('');
    const [characters, setCharacters] = useState([]);
    const [duration, setDuration] = useState(0);
    const [isComplete, setIsComplete] = useState(false);
    const [mapImageURL, setMapImageURL] = useState('');
    const [loaded, setLoaded] = useState(false);
    const [isValidating, setShowValidationForm] = useState(false);
    const [showLeaderboardsForm, setShowLeaderboardsForm] = useState(false);

    // Initial setup
    useEffect(() => {
        setup();

        async function setup() {
            await Promise.all([
                loadMapImage(),
                loadMapData(),
                loadCharacters(),
            ]);
            // setLoaded(true);
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
                    const { name, difficulty, coordinates } = doc.data();
                    const { x_min, x_max, y_min, y_max } = coordinates;
                    const characterImgURL = await getImageURL('characters', name + '.gif');
                    const character = new Character(name, difficulty, x_min, x_max, y_min, y_max, characterImgURL);
                    characters.push(character);
                });
            })
            setCharacters(characters);
            return true;
        };
    }, [db, mapIdParam, mapId, mapName])

    // timer logic - https://overreacted.io/making-setinterval-declarative-with-react-hooks/
    useInterval(() => {
        if (isComplete || !loaded) { return }
        setDuration(duration + 1);
    }, 100)

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

    useEffect(() => {
        if (isComplete) {
            setShowLeaderboardsForm(true);
        }
    }, [isComplete])

    useEffect(() => {
        if (isValidating) {
            setShowValidationForm(true);
        }
    }, [isValidating])

    function onHideValidationForm() {
        setShowValidationForm(false);
    }

    function onHideLeaderboardsForm() {
        setShowLeaderboardsForm(false);
        navigate('/leaderboards');
    }
    function toHome() {
        navigate('/');
    }
    function toGame() {
        navigate('/game');
    }
    function toLeaderboards() {
        navigate('/leaderboards');
    }

    /**
     * Saves the game to Firestore with the username provided from the form - defaults to "Anonymous" if no name provided.
     */
    async function leaderboardsOnSubmit(e) {
        e.preventDefault();
        const formData = getFormData(e);
        const uname = formData.username;
        const gameData = GameFactory({
            map_id: mapId,
            username: uname ? uname : 'Anonymous',
            duration: duration,
        });
        saveGame(gameData);
        navigate('/leaderboards');
    }

    function getFormData(e) {
        const formData = new FormData(e.target);
        const formProps = Object.fromEntries(formData);
        return formProps;
    }

    return (
        <>
            <Row className='d-flex'>
                <StatusBar 
                    loaded={loaded}
                    duration={duration}
                    characters={characters} 
                />
            </Row>
            <LeaderboardsForm 
                duration={duration}
                show={showLeaderboardsForm}
                onHide={onHideLeaderboardsForm}
                onSubmit={leaderboardsOnSubmit}
                toHome={toHome}
                toGame={toGame}
                toLeaderboards={toLeaderboards}
                backdrop='static'
            />
            <DBValidationModal
                show={isValidating}
                onHide={onHideValidationForm}
                backdrop='static'
            />
            <Row className='flex-grow-1'>
                <GameMap 
                    loaded={loaded}
                    mapImageURL={mapImageURL} 
                    characters={characters} 
                    className='flex-grow-1'
                    isComplete={isComplete}
                    getFormData={getFormData}
                    setShowValidationForm={setShowValidationForm}
                />    
            </Row>
        </>
    )
}