import React, { useState, useEffect } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';

export default function WebSocketComponent() {
    const [message, setMessage] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = new ReconnectingWebSocket('ws://localhost:8080/ws');
        setSocket(newSocket);
        console.log(newSocket);

        newSocket.addEventListener('open', () => {
            console.log('Connected to WebSocket');
            console.log(newSocket);
        });

        newSocket.addEventListener('message', (event) => {
            const receivedMessage = event.data;
            setMessage(receivedMessage);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    const sendMessage = () => {
        if (socket && socket.readyState === socket.OPEN) {
            socket.send(inputMessage);
        }
    };

    return (
        <div>
            <p>Received message: {message}</p>
            <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
};
