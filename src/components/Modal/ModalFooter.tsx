import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
interface ModalFooterProps {
    handleClose: () => void;
}
function ModalFooter({ handleClose }: ModalFooterProps) {
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