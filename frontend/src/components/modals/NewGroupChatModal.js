import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import requestHandler from "../../services/RequestHandler";
import {useContext, useEffect, useState} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import * as strings from "../../strings/strings";
import {MODAL_START_GROUP_NEW_CHAT} from "../../strings/strings";


export default function NewGroupChatModal({ showModal, onClose, onUsersSelected }) {
    const {loggedUser} = useContext(LoggedUserContext);
    const [users, setUsers] = useState([]);
    const [selectedUsersIndexes, setSelectedUsersIndexes] = useState([]);

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
        let selectedUsers = []
        selectedUsersIndexes.map((selectedUsersIndex, index) => {
            selectedUsers.push(users[selectedUsersIndex]);
        })
        onUsersSelected(selectedUsers);
        setSelectedUsersIndexes([]);
    }

    function handleCheckboxTick(index) {
        if(!selectedUsersIndexes.includes(index)) {
            selectedUsersIndexes.push(index)
        } else {
            const whereIsIndex = selectedUsersIndexes.indexOf(index);
            selectedUsersIndexes.splice(whereIsIndex, 1);
        }
    }

    return(
        <>
            <Modal centered show={showModal} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{strings.MODAL_START_GROUP_NEW_CHAT}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        users.map((user, index) => (
                            (user.uid !== loggedUser.uid) &&
                            <Form.Check
                                label={getLabel(user)}
                                key={user.uid}
                                name="group1"
                                type="checkbox"
                                onChange={() => handleCheckboxTick(index)}
                                /*id={`reverse-${type}-1`}*/
                            />
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-dark" onClick={newChat} disabled={selectedUsersIndexes.length < 2}>
                        {strings.MODAL_START_GROUP_NEW_CHAT}
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}