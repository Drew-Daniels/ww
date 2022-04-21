import { useState } from 'react';
import { Container, ListGroup, Badge } from 'react-bootstrap';
import './Leaderboards.scss';

export default function Leaderboards(props) {

    return (
        <Container>
            Leaderboards will go here
        </Container>
    )

    async function getLeaderboardData() {
        // get leaderboards data from Firestore here
    }
}
