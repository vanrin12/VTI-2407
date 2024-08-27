import { Modal } from 'react-bootstrap';
import ModalBody from './ModalBody';
import ModalHeader from './ModalHeader';
import ModalFooter from './ModalFooter';
interface ModalProps {
    show: boolean;
    handleClose: () => void;
    title: string;
    children: any;
    handleSave: Function;
}
function ModalCustom({ show, handleClose, title, children, handleSave }: ModalProps) {
    return (
        <Modal show={show} onHide={handleClose}>
            <ModalHeader title={title}/>
            <ModalBody>{children}</ModalBody>
            <ModalFooter handleClose={handleClose} handleSave={handleSave} />
        </Modal>
    );
}

export default ModalCustom;