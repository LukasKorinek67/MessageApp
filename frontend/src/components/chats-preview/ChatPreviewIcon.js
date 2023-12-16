import Col from "react-bootstrap/Col";
import BootstrapIcons from "../../utils/BootstrapIcons";


export default function ChatPreviewIcon({ isGroupChat }) {
    return (
        <>
            {
                !isGroupChat ?
                    <Col sm={3} className="pt-1">{BootstrapIcons.user(40,40)}</Col>
                : isGroupChat &&
                    <Col sm={3} className="pt-1">{BootstrapIcons.groupChatUsers(40,40)}</Col>
            }
        </>
    );
}