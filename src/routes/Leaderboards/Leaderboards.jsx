import { useState } from 'react';
import { Container, ListGroup, Badge, Placeholder } from 'react-bootstrap';
import {
    query,
    collection,
    getFirestore,
    orderBy,
    limit,
    getDocs,
} from 'firebase/firestore';
import db from '../../firebase';
import './Leaderboards.scss';

const topGames = loadTopGames()

async function loadTopGames() {
    const top10Query = query(collection(db, 'games'), orderBy('duration_sec', 'desc'), limit(10));
    const top10GamesPromise = await getDocs(top10Query);
    try {
        const top10Games = [];
        top10GamesPromise.forEach((doc) => {
            top10Games.push(doc.data());
        })
        return top10Games;
    }
    catch(err) {
        console.error(err)
    }
}

export default function Leaderboards(props) {

    const [loaded, setLoaded] = useState(false);
    const [games, setGames] = useState(topGames);

    var placeholders = [];
    for (let i=0; i < 10; i++) {
        placeholders.push(
            <Placeholder key={i} xs={12} animation='glow' />
        )
    }

    return (
        <Container fluid className='d-flex justify-content-center flex-grow-1'>
            <ListGroup variant='flush'>
                {!loaded && placeholders }
                {loaded &&
                    games.map((game, i) => {
                        i++
                        return (
                            <ListGroup.Item key={i} as='li' className="d-flex justify-content-between align-items-start">
                                <Badge bg={i === 1 ? 'warning': 'success'} pill>
                                    {i}
                                </Badge>
                                <Container className='d-flex flex-column'>
                                    <div>
                                        {game.user_id}
                                    </div>
                                    <div>
                                        {game.duration_sec}
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
