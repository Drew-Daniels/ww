import { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import {
    query,
    collection,
    where,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import './Leaderboards.scss';

export default function Leaderboards(props) {

    const [loaded, setLoaded] = useState(false);
    const [map1Records, setMap1Records] = useState([]);
    const [map2Records, setMap2Records] = useState([]);

    useEffect(() => {
        setup();

        // FUNCTIONS
        async function setup() {
            await setAllMapRecords();
            setLoaded(true);
        }
        async function setAllMapRecords() {
            Promise.all([
                setMapRecords(1),
                setMapRecords(2),
            ])
        }
        async function setMapRecords(mapId, numRecords=10) {
            const gamesRef = collection(db, 'games');
            const topNQuery = query(gamesRef, where('map_id', '==', mapId), orderBy('duration', 'asc'), limit(numRecords));
            const topNGamesPromise = await getDocs(topNQuery);
            try {
                const topNGames = [];
                topNGamesPromise.forEach((doc) => {
                    topNGames.push(doc.data());
                })
                const setter = mapId === 1 ? setMap1Records: setMap2Records;
                setter(prevState => topNGames);
            }
            catch(err) {
                console.error(err)
            }
        }
    }, [])



    return (
        <Container as='main' fluid className='d-flex flex-grow-1'>
            <Row className='d-flex flex-grow-1'>
                <Leaderboard 
                    mapName='Robot City'
                    mapRecords={map1Records}
                    loaded={loaded}
                />
                <Leaderboard 
                    mapName='Ultimate Space Battle'
                    mapRecords={map2Records}
                    loaded={loaded}
                />
            </Row>
        </Container>
    )
}
