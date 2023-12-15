import {useContext, useEffect, useState, useRef} from 'react';

import Stack from "react-bootstrap/Stack";

import AllMessages from "./AllMessages";
import MessageBox from "./MessageBox";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import ChatWindowHeader from "./ChatWindowHeader";
import requestHandler from "../../services/RequestHandler";
import {useStompClient, useSubscription} from "react-stomp-hooks";
import dateTimeService from "../../utils/DateTimeUtil";
import UsersInChatUtil from "../../utils/UsersInChatUtil";

export default function ChatWindow({chat, updateAllChatsFunction, selectedChat}) {
    const {loggedUser} = useContext(LoggedUserContext);
    const [allMessages, setAllMessages] = useState([]);
    const chatWindowRef = useRef(null);

    const destination = process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_DESTINATION_PREFIX + chat.id;

    useSubscription(destination, (message) => {
        message = JSON.parse(message.body);
        if(message.user && message.user.uid === loggedUser.uid) {
            // tady jen projet allMessages a změnit (pravděpodobně se potom bude jednat o to s tím read/unread)
            changeMyMessageReadStatus(message);
        } else {
            addMessageToAllMessages(message);
        }
        updateAllChatsFunction(chat.id, message);
    });
    const stompClient = useStompClient();

    let groupChat;
    let user;
    const usersInChatUtil = new UsersInChatUtil();
    if(chat.users.length > 2) {
        groupChat = true;
        user = usersInChatUtil.getOtherUsersInGroupChat(chat.users, loggedUser)[0];
    } else {
        groupChat = false;
        user = usersInChatUtil.getOtherUserInChat(chat.users, loggedUser);
    }

    useEffect(() => {
        requestHandler.getChatMessages(loggedUser, user, chat.id).then(
            response => {return response.data;}
        ).then(data => {
            setAllMessages(data);
        }).catch((error) => {
            console.error('Error: ', error);
        });
    }, []);

    useEffect(() => {
        // jakmile se přidá zpráva, scrollovat dolu
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [allMessages]);

    useEffect(() => {
        if(selectedChat === chat.id) {
            // scrollovat dolů
            if (chatWindowRef.current) {
                chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
            }
        }
    }, [selectedChat]);

    function handleScroll() {
        const { scrollTop, clientHeight, scrollHeight } = chatWindowRef.current;
        if((scrollTop + clientHeight) >= scrollHeight) {
            //console.log("Jsem úplně dole! - chat " + chat.id);
            // tady zavolat, že mám všechny zprávy přečtený!
            sendLastMessageRead()
        }
    }

    useEffect(() => {

        if (chatWindowRef.current) {
            chatWindowRef.current.addEventListener("scroll", handleScroll);
        }
        return () => {
            if (chatWindowRef.current) {
                chatWindowRef.current.removeEventListener("scroll", handleScroll);
            }
        };
    }, [allMessages]);

    function sendLastMessageRead() {
        let message = getLastReceivedMessage();
        if(message !== null && !message.read) {
            console.log("Tady ji pošlu aby byla read a taky všechny před ní!");
            //message.read = true;
            //sendMessageToWebsocket()
        }
    }

    function getLastReceivedMessage() {
        const allMessagesReversed = allMessages.slice().reverse();
        let lastReceivedMessage;
        allMessagesReversed.map((message, index) => {
            if(message.user.uid !== loggedUser.uid) {
                if(lastReceivedMessage == null) {
                    lastReceivedMessage = message;
                }
            }
        });
        return lastReceivedMessage
    }

    function addMessageToAllMessages(message) {
        let newAllMessages = allMessages.slice();
        newAllMessages.push(message);
        setAllMessages(newAllMessages);
    }

    function sendMessageToWebsocket(message) {
        if(stompClient) {
            const destination = process.env.REACT_APP_WEBSOCKET_DESTINATION_PREFIX + chat.id;
            stompClient.publish({
                destination: destination,
                body: JSON.stringify(message)
            })
        }
    }

    function changeMyMessageReadStatus(receivedMyMessage) {
        const allMessagesReversed = allMessages.slice().reverse();
        allMessagesReversed.map((message, index) => {
            // tady by asi bylo ideální id, pokud ho tam přidělám
            if((message.user.uid === receivedMyMessage.user.uid) &&
                (message.text === receivedMyMessage.text)) {
                // tady bych potřeboval zkontrolovat ještě jestli se rovná time, ale to mám teď rozhozený zatím
                // proto tady trochu zvláštně porovnám ty read stavy, abych eliminoval, že přepíšu read na unread
                if((message.read === null || message.read === false) && (receivedMyMessage.read !== null)) {
                    message.read = receivedMyMessage.read;
                }
            }
        });
        //setAllMessages(allMessagesReversed.reverse())
    }

    function onMessageSend(messageText) {
        const message = {
            user: loggedUser,
            text: messageText,
            time: dateTimeService.getDateTime(),
            read: null,
            chatId: chat.id
        };
        addMessageToAllMessages(message);
        sendMessageToWebsocket(message);
    };

    // TOHLE PAK SMAZAT!! Jen na test zprávy od druhýho!
    function testOtherUserSend(messageText) {
        const message = {
            user: user,
            text: messageText,
            time: dateTimeService.getDateTime(),
            read: false,
            chatId: chat.id
        };
        sendMessageToWebsocket(message);
    }
    
    return (
        <>
            <Stack gap={0} id="chat-window-stack">
                <ChatWindowHeader users={chat.users}/>
                <div id="chat-window-messages" ref={chatWindowRef} className="px-2">
                    <AllMessages allMessages={allMessages} isGroupChat={groupChat}/>
                </div>
                <div id="message-box" className="px-2">
                    <MessageBox onMessageSend={testOtherUserSend}/>
                    <MessageBox onMessageSend={onMessageSend}/>
                </div>
            </Stack>
        </>
    );
}