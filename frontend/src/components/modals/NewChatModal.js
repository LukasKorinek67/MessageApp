import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import requestHandler from "../../services/RequestHandler";
import {useContext, useEffect, useState} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import * as strings from "../../strings/strings";


export default function NewChatModal({ showModal, onClose, onUserSelected }) {
    const {loggedUser} = useContext(LoggedUserContext);
    const [users, setUsers] = useState([]);
    const [selectedUserIndex, setSelectedUserIndex] = useState(null);

    useEffect(() => {
        const token = loggedUser.accessToken;
        requestHandler.getAllUsers(token).then(
            response => {return response.data;}
        ).then(data => {
            //console.log(data);
            setUsers(data)
        }).catch((error) => {
            console.error('Error: ', error);
        });
    }, []);

    function getLabel(user) {
        const label = user.username + " (" + user.email + ")";
        return label;
    }

    function newChat() {
        onUserSelected(users[selectedUserIndex]);
        setSelectedUserIndex(null);
    }

    return(
        <>
            <Modal centered show={showModal} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.MODAL_START_NEW_CHAT}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        users.map((user, index) => (
                            (user.uid !== loggedUser.uid) &&
                                <Form.Check
                                    label={getLabel(user)}
                                    key={user.uid}
                                    name="group1"
                                    type="radio"
                                    onChange={() => setSelectedUserIndex(index)}
                                    /*id={`reverse-${type}-1`}*/
                                />
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={newChat} disabled={selectedUserIndex === null}>
                        {strings.MODAL_START_NEW_CHAT}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}