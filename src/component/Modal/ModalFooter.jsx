import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
function ModalFooter({ handleClose }) {
    return (
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
    );
}

export default ModalFooter;