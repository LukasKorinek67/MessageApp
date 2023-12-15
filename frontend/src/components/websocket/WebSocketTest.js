import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function WebSocketTest() {
    const [socketUrl, setSocketUrl] = useState('ws://localhost:8080/ws');
    const [messageHistory, setMessageHistory] = useState([]);
    const { getWebSocket, sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(
        socketUrl,
        {
            share: false,
            shouldReconnect: () => false,
        },
    )

    //const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

    useEffect(() => {
        console.log("Connection state changed")
        console.log(readyState)
        const connectionStatus = {
            [ReadyState.CONNECTING]: 'Connecting',
            [ReadyState.OPEN]: 'Open',
            [ReadyState.CLOSING]: 'Closing',
            [ReadyState.CLOSED]: 'Closed',
            [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
        }[readyState];
        console.log(connectionStatus)
        console.log("getWebSocket()")
        console.log(getWebSocket())
        if (readyState === ReadyState.OPEN) {
            /*sendJsonMessage({
                event: "subscribe",
                data: {
                    channel: "chat",
                },
            })*/
        }
    }, [readyState])

    useEffect(() => {
        if (lastMessage !== null) {
            setMessageHistory((prev) => prev.concat(lastMessage));
        }
        console.log(messageHistory);
        console.log(socketUrl);
        console.log(readyState);
        console.log(lastMessage);
    }, [lastMessage, setMessageHistory]);

    function handleClickSendMessage() {
        const message = {
            event: "sendMessage",
            data: {
                channel: "/app/chat",
                content: "Hello",
            },
        };
        sendJsonMessage(message);
    }

    const connectionStatus = {
        [ReadyState.CONNECTING]: 'Connecting',
        [ReadyState.OPEN]: 'Open',
        [ReadyState.CLOSING]: 'Closing',
        [ReadyState.CLOSED]: 'Closed',
        [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
    }[readyState];

    return (
        <div>
            <button
                onClick={handleClickSendMessage}
                disabled={readyState !== ReadyState.OPEN}
            >
                Click Me to send 'Hello'
            </button>
            <span>The WebSocket is currently {connectionStatus}</span>
            {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
            <ul>
                {messageHistory.map((message, idx) => (
                    <span key={idx}>{message ? message.data : null}</span>
                ))}
            </ul>
        </div>
    );
}