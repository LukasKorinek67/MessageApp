
class UsersInChatUtil {
    getAllRecipientUsernamesInGroupChat(chatUsers, loggedUser) {
        if(chatUsers.length > 2) {
            const users = this.getOtherUsersInGroupChat(chatUsers, loggedUser);
            if(users.length < 2) {
                return null;
            } else {
                return this.getUsernamesSeparatedByComa(users)
            }
        } else {
            return null;
        }
    }

    getOtherUsersInGroupChat(chatUsers, loggedUser) {
        let users = [];
        chatUsers.map((user) => {
            if ((chatUsers.length > 2) && (user.uid !== loggedUser.uid)) {
                users.push(user);
            }
        });
        return users;
    }

    getUsernamesSeparatedByComa(users) {
        if(users.length < 2) {
            return null;
        }
        let usernames = users[0].username;
        for (let i = 1; i < users.length; i++) {
            usernames += ", ";
            usernames += users[i].username;
        }
        return usernames;
    }

    getOtherUserInChat(chatUsers, loggedUser) {
        let searchedUser;
        chatUsers.map((user) => {
            if ((chatUsers.length == 2) && (user.uid !== loggedUser.uid)) {
                searchedUser = user;
            }
        });
        return searchedUser;
    }
}
export default UsersInChatUtil;