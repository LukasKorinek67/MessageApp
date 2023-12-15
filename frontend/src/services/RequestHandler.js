import axios from "axios";

class RequestHandler {

    constructor() {
        this.url = process.env.REACT_APP_BACKEND_URL;
    }

    getLoggedUser() {
        const endPoint = "/user";
        return axios.get(this.url + endPoint);
    }

    getAllChats(loggedUser) {
        const token = loggedUser.accessToken;
        const endPoint = "/allChats";
        return axios.post(this.url + endPoint, loggedUser, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    getChatMessages(loggedUser, user, chatId) {
        const endPoint = "/chatMessages";
        const token = loggedUser.accessToken;
        const data = {
            loggedUser: loggedUser,
            user: user,
            chatId: chatId
        }
        return axios.post(this.url + endPoint, data, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
    }

    getAllUsers(token) {
        const endPoint = "/user/allUsers";
        return axios.get(this.url + endPoint, {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
    }
}
const requestHandler = new RequestHandler();
export default requestHandler;