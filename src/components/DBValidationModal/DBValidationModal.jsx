import { Modal } from 'react-bootstrap';
import './DBValidationModal.scss';

export default function DBValidationModal(props) {

    return (
        <Modal
            size='lg'
            centered
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