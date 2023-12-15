import React, {useContext} from "react";
import * as strings from "../../strings/strings";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import UsersInChatUtil from "../../utils/UsersInChatUtil";


export default function ChatWindowHeader({users}) {
    const {loggedUser} = useContext(LoggedUserContext);



    let groupChat;
    let user;
    let usersUsernamesText;
    const usersInChatUtil = new UsersInChatUtil();
    if(users.length > 2) {
        groupChat = true;
        usersUsernamesText = usersInChatUtil.getAllRecipientUsernamesInGroupChat(users, loggedUser);
    } else {
        groupChat = false;
        user = usersInChatUtil.getOtherUserInChat(users, loggedUser);
    }

    return (
        <>
            <div className="pt-3 pb-1 px-2" id="chat-window-header">
                {!groupChat &&
                    <h6 className="text-center">{strings.CHAT_WITH_USER_TEXT} {user.username}</h6>
                }
                {groupChat &&
                    <h6 className="text-center">{usersUsernamesText}</h6>
                }
            </div>
        </>
    );
}