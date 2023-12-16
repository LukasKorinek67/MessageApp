import axios from "axios";

class RequestHandler {

    constructor() {
        this.url = process.env.REACT_APP_BACKEND_URL;
    }

    getAllChats(token) {
        const endPoint = "/chat/allChats"
        return axios.get(this.url + endPoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }

    getChatMessages(token, chatUid) {
        const endPoint = "/chat/messages/" + chatUid;
        return axios.get(this.url + endPoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }

    getAllUsers(token) {
        const endPoint = "/user/allUsers";
        return axios.get(this.url + endPoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }

    addNewChat(token, chat) {
        const endPoint = "/chat/create";
        return axios.post(this.url + endPoint, chat, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    getNumberOfUnreadMessages(token, chatUid) {
        const endPoint = "/chat/messages/unread-number/" + chatUid;
        return axios.get(this.url + endPoint, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });
    }
}
const requestHandler = new RequestHandler();
export default requestHandler;