import {useState, useEffect, useContext} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from 'react-bootstrap/Nav';
import Tab from 'react-bootstrap/Tab';

import ChatPreview from "./chats-panel/ChatPreview";
import ChatWindow from "./chat-window/ChatWindow";
import requestHandler from '../services/RequestHandler';
import * as strings from "../strings/strings";
import {StompSessionProvider} from "react-stomp-hooks";
import {LoggedUserContext} from "../context/LoggedUserContext";

export default function AllChats() {
    const {loggedUser} = useContext(LoggedUserContext);
    const [chats, setChats] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null)
    useEffect(() => {
        requestHandler.getAllChats(loggedUser).then(
            response => {return response.data;}
        ).then(data => {
            sortByLastMessageDateTime(data);
            setChats(data);
        }).catch((error) => {
            console.error('Error: ', error);
        });
    }, []);

    function updateChatLastMessage(chatId, lastMessage) {
        setChats(prevChats => {
            const updatedChats = prevChats.map(chat => {
                if (chat.id === chatId) {
                    return {
                        ...chat,
                        lastMessage: lastMessage
                    };
                }
                return chat;
            });
            sortByLastMessageDateTime(updatedChats);
            return updatedChats;
        });
    }

    function sortByLastMessageDateTime(allChats) {
        allChats.sort((a, b) => {
            const bTime = new Date(b.lastMessage.time).getTime();
            const aTime = new Date(a.lastMessage.time).getTime();
            return bTime - aTime;
        });
    }

    function selectChat(chatId) {
        setSelectedChat(chatId);
    }

    return (
        <>
            <Tab.Container>
                <Row>
                    <Col sm={4} id="chats-column">
                        { chats && 
                            <Nav variant="pills" className="flex-column nav-pills-custom">

                                {chats.map((chat, index) => (
                                    <Nav.Item key={chat.id} onClick={() => selectChat(chat.id)} className="nav-pills-custom">
                                        <Nav.Link eventKey={chat.id} className="nav-pills-custom">
                                            <StompSessionProvider
                                                url={process.env.REACT_APP_WEBSOCKET_URL}
                                            >
                                                <ChatPreview chat={chat}/>
                                            </StompSessionProvider>
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                            </Nav>
                        }
                        {(!chats || (chats.length === 0)) && <p className="my-3 mx-1 fw-lighter text-center">{strings.NO_CHATS_TEXT}</p>}
                    </Col>
                    <Col sm={8} id="chat-window">
                        { chats && 
                        <Tab.Content>
                            {chats.map((chat, index) => (
                                <Tab.Pane eventKey={chat.id} key={chat.id}>
                                    <StompSessionProvider
                                        url={process.env.REACT_APP_WEBSOCKET_URL}
                                    >
                                        <ChatWindow chat={chat} updateAllChatsFunction={updateChatLastMessage} selectedChat={selectedChat}/>
                                    </StompSessionProvider>
                                </Tab.Pane>
                            ))}
                            </Tab.Content>
                        }
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}