import { Modal } from 'react-bootstrap';
import './DBValidationModal.scss';

export default function DBValidationModal(props) {

    const { show, onHide } = props;

    return (
        <Modal
            size='lg'
            centered
            id='leaderboards-form'
            show={show}
            onHide={onHide}
        >
            <Modal.Header>
                <Modal.Title>Validation</Modal.Title>
                <Modal.Body>
                    test
                </Modal.Body>
            </Modal.Header>
        </Modal>
    )
}