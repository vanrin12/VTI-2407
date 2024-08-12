import { Modal } from 'react-bootstrap';
function ModalHeader({ title }) {
    return (
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
    );
}

export default ModalHeader;