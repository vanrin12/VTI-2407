import Modal from 'react-bootstrap/Modal';
import Button from '../Button';
interface ModalFooterProps {
    handleClose: () => void;
    handleSave: any;
}
function ModalFooter({ handleClose, handleSave }: ModalFooterProps) {
    return (
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
    );
}

export default ModalFooter;