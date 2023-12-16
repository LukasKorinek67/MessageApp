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
import Stack from "react-bootstrap/Stack";
import NewChatButton from "./buttons/logo-buttons/NewChatButton";
import NewGroupChatButton from "./buttons/logo-buttons/NewGroupChatButton";
import Card from "react-bootstrap/Card";
import { v4 as uuidv4 } from 'uuid';

export default function AllChats() {
    const {loggedUser} = useContext(LoggedUserContext);
    const [chats, setChats] = useState(null);
    const [selectedChat, setSelectedChat] = useState(null)
    useEffect(() => {
        updateAllChats();
    }, []);

    function updateAllChats() {
        requestHandler.getAllChats(loggedUser.accessToken).then(
            response => {return response.data;}
        ).then(data => {
            sortByLastMessageDateTime(data);
            setChats(data);
        }).catch((error) => {
            console.error('Error: ', error);
        });
    }

    function updateChatLastMessage(chatUid, lastMessage) {
        setChats(prevChats => {
            const updatedChats = prevChats.map(chat => {
                if (chat.uid === chatUid) {
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
            if(a.lastMessage === null && b.lastMessage === null) {
                return 0;
            } else if(a.lastMessage === null && b.lastMessage !== null) {
                return -1;
            } else if(a.lastMessage !== null && b.lastMessage === null) {
                return 1;
            } else {
                const bTime = new Date(b.lastMessage.time).getTime();
                const aTime = new Date(a.lastMessage.time).getTime();
                return bTime - aTime;
            }
        });
    }

    function newChat(user) {
        const users = [loggedUser, user];
        handleCreationOfNewChat(users);
    }

    function newGroupChat(users) {
        users.push(loggedUser);
        handleCreationOfNewChat(users);
    }

    function handleCreationOfNewChat(users) {
        const existingChatUid = getChatUidByUsers(users);
        const doesChatAlreadyExist = (existingChatUid !== null);
        if(!doesChatAlreadyExist) {
            createNewChat(users);
        } else {
            // set zvolený chat na existingChatUid
            console.log("UŽ EXISTUJE");
            setSelectedChat(existingChatUid);
        }
    }

    function createNewChat(users) {
        const chat = {
            uid: uuidv4(),
            users: users,
            lastMessage: null
        };
        requestHandler.addNewChat(loggedUser.accessToken, chat).then(
            response => {
                return response.data;
            }
        ).then(data => {
            updateAllChats();
        }).catch((error) => {
            console.error('Error: ', error);
        });
    }

    function getChatUidByUsers(users) {
        let chatUid = null;
        chats.map(chat => {
            if(chat.users.length === users.length && areUsersArraysSame(chat.users, users)) {
                chatUid = chat.uid;
            }
        });
        return chatUid;
    }

    function areUsersArraysSame(usersArray1, usersArray2) {
        let uidsArray1 = [];
        for (const user of usersArray1) {
            uidsArray1.push(user.uid);
        }
        let uidsArray2 = [];
        for (const user of usersArray2) {
            uidsArray2.push(user.uid);
        }
        const set1 = new Set(uidsArray1);
        const set2 = new Set(uidsArray2);
        for (const uid of set1) {
            if (!set2.has(uid)) {
                return false;
            }
        }
        return true;
    }

    return (
        <>
            <Stack direction="horizontal" gap={2} className="m-2">
                <NewChatButton addNewChatFunction={newChat}/>
                <NewGroupChatButton addNewGroupChatFunction={newGroupChat}/>
            </Stack>
            <Card className="bg-light rounded" id="chats-card">
                <Tab.Container>
                    <Row>
                        <Col sm={4} id="chats-column">
                            { chats &&
                                <Nav activeKey={selectedChat} variant="pills" className="flex-column nav-pills-custom">

                                    {chats.map((chat, index) => (
                                        <Nav.Item key={chat.uid} onClick={() => setSelectedChat(chat.uid)} className="nav-pills-custom">
                                            <Nav.Link eventKey={chat.uid} className="nav-pills-custom">
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
                                    <Tab.Pane eventKey={chat.uid} key={chat.uid}>
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
            </Card>
        </>
    );
}