import Row from "react-bootstrap/Row";
import {useContext, useEffect, useState} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import BootstrapIcons from "../../utils/BootstrapIcons";
import Stack from "react-bootstrap/Stack";
import * as strings from "../../strings/strings";
import requestHandler from "../../services/RequestHandler";

export default function ChatPreviewLastMessage({lastMessage, isGroupChat}) {
    const {loggedUser} = useContext(LoggedUserContext);
    const [numberOfUnread, setNumberOfUnread] = useState(0);

    useEffect(() => {
        if (lastMessage !== null && !lastMessage.read) {
            requestHandler.getNumberOfUnreadMessages(loggedUser.accessToken, lastMessage.chatUid).then(
                response => {
                    return response.data;
                }
            ).then(data => {
                setNumberOfUnread(data);
            }).catch((error) => {
                console.error('Error: ', error);
            });
        }
    }, [lastMessage]);

    function getTitleForUnreadMessages() {
        switch(numberOfUnread) {
            case 1:
                return numberOfUnread + " " + strings.TITLE_UNREAD_MESSAGES_ONE;
            case 2:
                return numberOfUnread + " " + strings.TITLE_UNREAD_MESSAGES_TWO_TO_FOUR;
            case 3:
                return numberOfUnread + " " + strings.TITLE_UNREAD_MESSAGES_TWO_TO_FOUR;
            case 4:
                return numberOfUnread + " " + strings.TITLE_UNREAD_MESSAGES_TWO_TO_FOUR;
            default:
                return numberOfUnread + " " + strings.TITLE_UNREAD_MESSAGES_MORE;
        }
    }

    return (
        <>
            {
                !lastMessage ?
                    <Row className="fw-italic fw-lighter small text-ellipsis">{strings.NO_MESSAGES_YET}</Row>
                :(lastMessage.user.uid === loggedUser.uid && lastMessage.read) ?
                    <Row className="fw-italic">
                        <Stack direction="horizontal" gap={1} className="ps-0">
                            <div className="text-info">
                                {BootstrapIcons.doubleCheck(15,15)}
                            </div>
                            <div className="text-ellipsis">{lastMessage.text}</div>
                        </Stack>
                    </Row>
                :( lastMessage.user.uid === loggedUser.uid && !lastMessage.read) ?
                    <Row className="fw-italic">
                        <Stack direction="horizontal" gap={1} className="ps-0">
                            {BootstrapIcons.doubleCheck(15,15)}
                            <div className="text-ellipsis">{lastMessage.text}</div>
                        </Stack>
                    </Row>
                : (lastMessage.user.uid !== loggedUser.uid && !isGroupChat && lastMessage.read) ?
                    <Row className="fw-italic text-ellipsis">{lastMessage.text}</Row>
                : (lastMessage.user.uid !== loggedUser.uid && !isGroupChat && !lastMessage.read) ?
                    <Row className="fw-bold">
                        <Stack direction="horizontal" gap={1} className="ps-0">
                            <div className="text-ellipsis">{lastMessage.text}</div>
                            <div className="ms-auto me-0"><span className="badge rounded-pill text-bg-info small" title={getTitleForUnreadMessages()}>{numberOfUnread}</span></div>
                        </Stack>
                    </Row>
                : (lastMessage.user.uid !== loggedUser.uid && isGroupChat && lastMessage.read) ?
                    <Row className="fw-italic text-ellipsis">
                        {lastMessage.user.username}: {lastMessage.text}
                    </Row>
                : (lastMessage.user.uid !== loggedUser.uid && isGroupChat && !lastMessage.read) &&
                    <Row className="fw-semibold">
                        <Stack direction="horizontal" gap={1} className="ps-0">
                            <div className="text-ellipsis">{lastMessage.user.username}: {lastMessage.text}</div>
                            <div className="ms-auto me-0"><span className="badge rounded-pill text-bg-info small" title={getTitleForUnreadMessages()}>{numberOfUnread}</span></div>
                        </Stack>
                    </Row>
            }
        </>
    );
}