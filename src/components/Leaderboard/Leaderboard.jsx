import { Col, ListGroup, Placeholder } from 'react-bootstrap';
import Record from '../Record/Record';
import './Leaderboard.scss';

export default function Leaderboard(props) {

    const { loaded, mapName, mapRecords } = props;

    var placeholders = [];
    for (let i=0; i < mapRecords.length; i++) {
        placeholders.push(
            <Placeholder key={i} as={ListGroup.Item} xs={12} animation='glow' className='record'>
                <Placeholder xs={1} />
                {" "}
                <Placeholder xs={7} />
                {" "}
                <Placeholder xs={3} />
            </Placeholder>
        )
    }

    return (
        <Col className='leaderboard'>
            <div className='map-header-container'>
                <h1 className='text-center map-header'>{mapName}</h1>
            </div>
            <ListGroup className='d-flex flex-grow-1 records' variant='flush'>
                {!loaded && placeholders }
                {loaded &&
                    mapRecords.map((record, i) => {
                        i++
                        return (
                            <Record record={record} key={i} i={i} />
                        )
                    })
                }
            </ListGroup>
        </Col>
    )
}