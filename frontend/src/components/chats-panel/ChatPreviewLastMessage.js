import Row from "react-bootstrap/Row";
import {useContext} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import BootstrapIcons from "../../utils/BootstrapIcons";
import Stack from "react-bootstrap/Stack";

export default function ChatPreviewLastMessage({lastMessage, isGroupChat}) {
    const {loggedUser} = useContext(LoggedUserContext);

    return (
        <>
            {
                (lastMessage.user.uid === loggedUser.uid && lastMessage.read) ?
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
                            <div className="ms-auto me-0"><span className="badge rounded-pill text-bg-info small">1</span></div>
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
                            <div className="ms-auto me-0"><span className="badge rounded-pill text-bg-info small">1</span></div>
                        </Stack>
                    </Row>
            }
        </>
    );
}