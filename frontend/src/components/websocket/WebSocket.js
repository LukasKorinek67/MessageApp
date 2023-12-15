import React, { useState, useCallback, useEffect } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export default function WebSocket() {
    const [socketUrl, setSocketUrl] = useState('ws://127.0.0.1:8080/ws/app/chat');
    const [messageHistory, setMessageHistory] = useState([]);
    const { sendMessage, sendJsonMessage, lastMessage, lastJsonMessage, readyState } = useWebSocket(
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
        if (readyState === ReadyState.OPEN) {
            sendJsonMessage({
                event: "subscribe",
                data: {
                    channel: "chat",
                },
            })
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


    const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);

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