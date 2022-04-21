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
import './Leaderboards.scss';

export default function Leaderboards(props) {


    const [loaded, setLoaded] = useState(false);
    const [games, setGames] = useState([]);

    loadTopGames();

    return (
        <Container fluid>
            {!loaded &&
                <Placeholder >

                </Placeholder>
            }
            {loaded &&
                games.map((game, i) => {
                    return (
                        <li>{game.user_id}</li>
                    )
                })
            }
        </Container>
    )

    async function loadTopGames() {
        const top10Query = query(collection(getFirestore(), 'games'), orderBy('duration_sec', 'desc'), limit(10));
        const top10GamesPromise = await getDocs(top10Query);
        try {
            const top10Games = [];
            top10GamesPromise.forEach((doc) => {
                top10Games.push(doc.data());
            })
            setGames(top10Games);
        }
        catch(err) {
            console.error(err)
        }
        finally {
            setLoaded(true)
        }
    }
}
