import MyMessage from "./messages/MyMessage";
import MessageGroupChat from "./messages/MessageGroupChat";
import Stack from 'react-bootstrap/Stack';
import {useContext} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import IncomingMessage from "./messages/IncomingMessage";

export default function AllMessages({ allMessages, isGroupChat }) {
    const {loggedUser} = useContext(LoggedUserContext);

    return (
        <>
            {allMessages.map((message, index) => (
                <div key={index}>
                    {/*{ (message.user === loggedUser) ? <MyMessage message={message}/> : <MessageGroupChat eventKey={index} message={message}/> }*/}
                    {
                        (message.user.uid === loggedUser.uid) ?
                            <MyMessage message={message} eventKey={index} />
                        : (message.user.uid !== loggedUser.uid && !isGroupChat) ?
                            <IncomingMessage message={message} eventKey={index} />
                        :(message.user.uid !== loggedUser.uid && isGroupChat) &&
                            <MessageGroupChat message={message} eventKey={index}/>
                    }
                </div>
            ))}
        </>
    );
}