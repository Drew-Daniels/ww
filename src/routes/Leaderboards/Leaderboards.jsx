import { useState, useEffect } from 'react';
import { Container, ListGroup, Badge, Placeholder } from 'react-bootstrap';
import {
    query,
    collection,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import { db } from '../../firebase';
import './Leaderboards.scss';

export default function Leaderboards(props) {

    const [loaded, setLoaded] = useState(false);
    const [games, setGames] = useState([]);


    useEffect(() => {
        retrieveGames();
        
        // FUNCTIONS
        async function retrieveGames() {
            const top10Query = query(collection(db, 'games'), orderBy('duration', 'asc'), limit(10));
            const top10GamesPromise = await getDocs(top10Query);
            try {
                const top10Games = [];
                top10GamesPromise.forEach((doc) => {
                    top10Games.push(doc.data());
                })
                setGames(top10Games);
                setLoaded(true);
            }
            catch(err) {
                console.error(err)
            }
        }
    }, [])

    var placeholders = [];
    for (let i=0; i < 10; i++) {
        placeholders.push(
            <Placeholder key={i} xs={12} animation='glow' />
        )
    }

    return (
        <Container as='main' fluid className='d-flex justify-content-center flex-grow-1'>
            <ListGroup variant='flush'>
                {!loaded && placeholders }
                {loaded &&
                    games.map((game, i) => {
                        i++
                        return (
                            <ListGroup.Item key={i} as='li' className="d-flex justify-content-between align-items-start">
                                <Badge className={i === 1 ? 'gold': i=== 2 ? 'silver' : i=== 3 ? 'bronze' : 'other'} pill >
                                    {i}
                                </Badge>
                                <Container className='d-flex flex-column'>
                                    <div>
                                        {game.user}
                                    </div>
                                    <div>
                                        {game.duration}
                                    </div>
                                </Container>
                            </ListGroup.Item>
                        )
                    })
                }
            </ListGroup>
        </Container>
    )
}
