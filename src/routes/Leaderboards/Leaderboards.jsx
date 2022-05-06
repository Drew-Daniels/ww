import { useState, useEffect } from 'react';
import { Container, ListGroup, Badge, Placeholder, Row, Col } from 'react-bootstrap';
import {
    query,
    collection,
    where,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
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

    var placeholders = [];
    for (let i=0; i < 10; i++) {
        placeholders.push(
            <Placeholder key={i} as={ListGroup.Item} xs={12} animation='glow'>
                <Placeholder xs={12} />
            </Placeholder>
        )
    }

    return (
        <Container as='main' fluid className='d-flex flex-grow-1'>
            <Row className='d-flex flex-grow-1'>
                <Col>
                    <h1 className='text-center'>Robot City</h1>
                    <ListGroup className='d-flex flex-grow-1' variant='flush'>
                        {!loaded && placeholders }
                        {loaded &&
                            map1Records.map((record, i) => {
                                i++
                                return (
                                    <ListGroup.Item key={i} as='li' className="d-flex justify-content-center">
                                        <Row className='d-flex flex-grow-1'>
                                            <Col lg={6} className="d-flex justify-content-end align-items-center">
                                                <Badge className={i === 1 ? 'gold': i=== 2 ? 'silver' : i=== 3 ? 'bronze' : 'other'} pill >
                                                    {i}
                                                </Badge>
                                            </Col>
                                            <Col lg={6}>
                                                <Container className='d-flex'>
                                                    <h1>{record.username}</h1>
                                                    <span>{record.duration} seconds</span>
                                                </Container>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Col>
                <Col>
                    <h1 className='text-center'>Ultimate Space Battle</h1>
                    <ListGroup className='d-flex flex-grow-1' variant='flush'>
                        {!loaded && placeholders }
                        {loaded &&
                            map2Records.map((record, i) => {
                                i++
                                return (
                                    <ListGroup.Item key={i} as='li' className="d-flex justify-content-center">
                                        <Row className='d-flex flex-grow-1'>
                                            <Col lg={6} className="d-flex justify-content-end align-items-center">
                                                <Badge className={i === 1 ? 'gold': i=== 2 ? 'silver' : i=== 3 ? 'bronze' : 'other'} pill >
                                                    {i}
                                                </Badge>
                                            </Col>
                                            <Col lg={6}>
                                                <Container className='d-flex'>
                                                    <h1>{record.username}</h1>
                                                    <span>{record.duration} seconds</span>
                                                </Container>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Col>
            </Row>
        </Container>
    )
}
