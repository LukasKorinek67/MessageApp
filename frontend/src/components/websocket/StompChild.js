import {useState} from "react";
import {useSubscription} from "react-stomp-hooks";


export default function StompChild() {
    const [message, setMessage] = useState("");
    // Subscribe to the topic that we have opened in our spring boot app
    const chatId = 1;
    const destination = process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_DESTINATION_PREFIX + chatId;
    useSubscription(destination, (message) => {
        message = JSON.parse(message.body);
        setMessage(message.text);
    });

    return (
        <>
            <div> The broadcast message from websocket broker is {message}</div>
        </>
    );
}