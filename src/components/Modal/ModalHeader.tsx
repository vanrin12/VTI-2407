import { Modal } from 'react-bootstrap';
interface ModalHeaderProps {
    title: string;
}
function ModalHeader({ title }: ModalHeaderProps) {
    return (
        <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
    );
}

export default ModalHeader;