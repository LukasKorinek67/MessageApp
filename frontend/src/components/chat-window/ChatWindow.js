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
import { v4 as uuidv4 } from 'uuid';

export default function ChatWindow({chat, updateAllChatsFunction, selectedChat}) {
    const {loggedUser} = useContext(LoggedUserContext);
    const [allMessages, setAllMessages] = useState([]);
    const chatWindowRef = useRef(null);

    const destination = process.env.REACT_APP_WEBSOCKET_SUBSCRIPTION_DESTINATION_PREFIX + chat.uid;

    useSubscription(destination, (message) => {
        message = JSON.parse(message.body);
        if(message.user && message.user.uid === loggedUser.uid) {
            // tady jen projet allMessages a změnit (pravděpodobně se potom bude jednat o to s tím read/unread)
            changeMyMessageReadStatus(message);
        } else if(message.user && message.user.uid !== loggedUser.uid && message.read === true) {
            // tady se jedná o read oznámení, který poslal on sám druhýmu uživateli, takže nic nedělat
        } else {
            addMessageToAllMessages(message);
        }
        updateAllChatsFunction(chat.uid, message);
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
        requestHandler.getChatMessages(loggedUser.accessToken, chat.uid).then(
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
        if(selectedChat === chat.uid) {
            // scrollovat dolů
            if (chatWindowRef.current) {
                chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
            }
            // pokud není scroll tak poslat že je vše přečteno
            if(areAllMessagesVisible()){
                sendLastMessageRead();
            }
        }
    }, [selectedChat]);

    function handleScroll() {
        const { scrollTop, clientHeight, scrollHeight } = chatWindowRef.current;
        if((scrollTop + clientHeight) >= scrollHeight) {
            //console.log("Jsem úplně dole! - chat " + chat.uid);
            // tady zavolat, že mám všechny zprávy přečtený!
            sendLastMessageRead();
        }
    }

    function areAllMessagesVisible() {
        const { scrollTop, clientHeight, scrollHeight } = chatWindowRef.current;
        if(scrollTop === 0 && clientHeight === scrollHeight) {
            return true;
        } else {
            return false;
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
        if((message !== undefined) && (message.read !== null) && !message.read) {
            const allUnreadMessages = getAllUnreadMessages();
            sendMessageStatusReadToWebsocket(allUnreadMessages);
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
        return lastReceivedMessage;
    }

    function getAllUnreadMessages() {
        const allMessagesReversed = allMessages.slice().reverse();
        let unreadMessages = [];
        allMessagesReversed.map((message, index) => {
            if(message.user.uid !== loggedUser.uid && !message.read) {
                unreadMessages.push(message);
            }
        });
        return unreadMessages;
    }

    function sendMessageStatusReadToWebsocket(messages) {
        messages.map((message, index) => {
            message.read = true;
            sendMessageToWebsocket(message);
        });
    }

    function addMessageToAllMessages(message) {
        let newAllMessages = allMessages.slice();
        newAllMessages.push(message);
        setAllMessages(newAllMessages);
    }

    function sendMessageToWebsocket(message) {
        if(stompClient) {
            const destination = process.env.REACT_APP_WEBSOCKET_DESTINATION_PREFIX + chat.uid;
            stompClient.publish({
                destination: destination,
                body: JSON.stringify(message)
            })
        }
    }

    function changeMyMessageReadStatus(receivedMyMessage) {
        const allMessagesReversed = allMessages.slice().reverse();
        allMessagesReversed.map((message, index) => {
            if(message.uid === receivedMyMessage.uid) {
                message.read = receivedMyMessage.read;
            }
        });
        //setAllMessages(allMessagesReversed.reverse())
    }

    function onMessageSend(messageText) {
        const message = {
            uid: uuidv4(),
            user: loggedUser,
            text: messageText,
            time: dateTimeService.getDateTime(),
            read: null,
            chatUid: chat.uid
        };
        addMessageToAllMessages(message);
        sendMessageToWebsocket(message);
    };
    
    return (
        <>
            <Stack gap={0} id="chat-window-stack">
                <ChatWindowHeader users={chat.users}/>
                <div id="chat-window-messages" ref={chatWindowRef} className="px-2">
                    <AllMessages allMessages={allMessages} isGroupChat={groupChat}/>
                </div>
                <div id="message-box" className="px-2">
                    <MessageBox onMessageSend={onMessageSend}/>
                </div>
            </Stack>
        </>
    );
}