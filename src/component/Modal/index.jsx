import { Modal } from 'react-bootstrap';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
function ModalCustom({ show, handleClose, title, children }) {
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader title={title} handleClose={handleClose}/>
            <ModalBody>{children}</ModalBody>
            <ModalFooter handleClose={handleClose} />
        </Modal>
    );
}

export default ModalCustom;