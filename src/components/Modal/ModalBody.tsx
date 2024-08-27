import { Modal } from "react-bootstrap";

function ModalBody({children}: any) {
    return (
        <Modal.Body>{children}</Modal.Body>
    );
}

export default ModalBody;