import {useState} from "react";
import {useSubscription} from "react-stomp-hooks";

export default function useWebSocketChatSubscription(chatId, lastMessage = "") {
    const [message, setMessage] = useState(lastMessage);
    const destination = process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_DESTINATION_PREFIX + chatId;
    useSubscription(destination, (message) => {
        message = JSON.parse(message.body);
        setMessage(message.text)
    });

    return message;

}