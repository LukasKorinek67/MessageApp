import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useSubscription} from "react-stomp-hooks";
import {useContext, useState} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import UsersInChatUtil from "../../utils/UsersInChatUtil";
import ChatPreviewLastMessage from "./ChatPreviewLastMessage";
import ChatPreviewIcon from "./ChatPreviewIcon";
import ChatPreviewNameAndTime from "./ChatPreviewNameAndTime";

export default function ChatPreview({chat}) {
    const {loggedUser} = useContext(LoggedUserContext);
    const lastMessageInChat = chat.lastMessage;
    const [lastMessage, setLastMessage] = useState(lastMessageInChat);
    const destination = process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_DESTINATION_PREFIX + chat.uid;
    useSubscription(destination, (message) => {
        message = JSON.parse(message.body);
        setLastMessage(message);
    });

    let groupChat;
    let user;
    let usersUsernamesText;
    const usersInChatUtil = new UsersInChatUtil();
    if(chat.users.length > 2) {
        groupChat = true;
        usersUsernamesText = usersInChatUtil.getAllRecipientUsernamesInGroupChat(chat.users, loggedUser);
    } else {
        groupChat = false;
        user = usersInChatUtil.getOtherUserInChat(chat.users, loggedUser);
    }

    return (
        <div className="py-1">
            <Container>
                <Row>
                    <ChatPreviewIcon isGroupChat={groupChat} />
                    <Col sm={9} className="ps-3">
                        {
                            (!groupChat && user != null) ?
                                <ChatPreviewNameAndTime usernameText={user.username} lastMessage={lastMessage}/>
                            : (groupChat && usersUsernamesText != null) &&
                                <ChatPreviewNameAndTime usernameText={usersUsernamesText} lastMessage={lastMessage}/>
                        }
                        <ChatPreviewLastMessage lastMessage={lastMessage} isGroupChat={groupChat} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}