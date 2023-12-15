import Button from "react-bootstrap/Button";
import * as strings from "../../../strings/strings";
import BootstrapIcons from "../../../utils/BootstrapIcons";
import requestHandler from "../../../services/RequestHandler";
import {useState} from "react";
import {Modal} from "react-bootstrap";
import NewChatModal from "../../modals/NewChatModal";

export default function NewChatButton({ addNewChatFunction }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    function onButtonClick() {
        handleShow();
    }

    function onUserSelected(user) {
        handleClose();
        addNewChatFunction(user);
    }

    return (
        <>
            <Button onClick={onButtonClick} className="p-2" variant="outline-primary" size="sm" title={strings.BUTTON_NEW_CHAT_TITLE}>{BootstrapIcons.newMessage(17,17)}</Button>
            <NewChatModal showModal={showModal} onClose={handleClose} onUserSelected={onUserSelected}/>
        </>
    );

}