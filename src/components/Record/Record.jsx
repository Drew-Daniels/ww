import { Container, ListGroup, Row, Col } from 'react-bootstrap';
import { IconContext } from 'react-icons';
import { IoMdTrophy as TrophyIcon } from 'react-icons/io';

import './Record.scss';

export default function Record(props) {

    const { record, i } = props;

    var color;
    var size;
    switch (i) {
        case 1:
            color = 'gold';
            size = '2rem';
            break;
        case 2:
            color = 'silver';
            size = '1.75rem'
            break;
        case 3:
            color = '#CD7F32';
            size='1.5rem';
            break;
        default:
            color = '#fff';
            size = '1.25rem'
    }

    return (
        <ListGroup.Item as='li' className="d-flex record">
            <Row className='d-flex flex-grow-1'>
                <Col xs={2} sm={2} lg={2} className="d-flex justify-content-end align-items-center">
                    <IconContext.Provider value={{ color: color, size: size }}>
                        <TrophyIcon />
                    </IconContext.Provider>
                </Col>
                <Col xs={10} sm={10} lg={10}>
                    <Container className='d-flex justify-content-around align-items-center'>
                        <Row className='d-flex flex-grow-1'>
                            <Col className='d-flex align-items-center'>
                                <h2>{record.username}</h2>    
                            </Col>
                            <Col className='d-flex justify-content-end align-items-center'>
                                <span>{record.duration} ms</span>
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </ListGroup.Item>
    )
}