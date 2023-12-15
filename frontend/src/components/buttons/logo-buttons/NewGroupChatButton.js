import BootstrapIcons from "../../../utils/BootstrapIcons";
import Button from "react-bootstrap/Button";
import * as strings from "../../../strings/strings";
import requestHandler from "../../../services/RequestHandler";
import NewChatModal from "../../modals/NewChatModal";
import NewGroupChatModal from "../../modals/NewGroupChatModal";
import {useState} from "react";

export default function NewGroupChatButton({ addNewGroupChatFunction }) {
    const [showModal, setShowModal] = useState(false);

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    function onButtonClick() {
        handleShow();
    }

    function onUsersSelected(users) {
        handleClose();
        addNewGroupChatFunction(users);
    }

    return (
        <>
            <Button onClick={onButtonClick} className="p-2" variant="outline-primary" size="sm" title={strings.BUTTON_NEW_GROUP_CHAT_TITLE}>{BootstrapIcons.groupChat(17,17)}</Button>
            <NewGroupChatModal showModal={showModal} onClose={handleClose} onUsersSelected={onUsersSelected}/>
        </>
    );
}