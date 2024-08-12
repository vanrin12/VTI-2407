import { Modal } from "react-bootstrap";

function ModalBody({children}) {
    return (
        <Modal.Body>{children}</Modal.Body>
    );
}

export default ModalBody;