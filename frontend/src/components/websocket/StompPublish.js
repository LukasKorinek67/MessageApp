import {useStompClient} from "react-stomp-hooks";
import React, {useState} from "react";

export default function StompPublish() {
    const [inputMessage, setInputMessage] = useState('');

    const stompClient = useStompClient();

    const publishMessage = () => {
        if(stompClient) {
            /*const message = {
                "message": inputMessage
            }*/
            const chatId = 1;
            const message = {
                sender: "TestSender",
                text: inputMessage,
                time: "4:20",
                read: false,
                chatId: chatId
            }
            const destination = process.env.REACT_APP_WEBSOCKET_DESTINATION_PREFIX + chatId;
            stompClient.publish({
                destination: destination,
                body: JSON.stringify(message)
            })
        }
    }
    return (
        <>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={publishMessage}> Send message </button>
        </>
    );
}