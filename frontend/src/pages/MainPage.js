import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import Header from "../components/Header";
import AllChats from "../components/AllChats";
import Footer from "../components/Footer";
import NewChatButton from "../components/buttons/logo-buttons/NewChatButton";
import NewGroupChatButton from "../components/buttons/logo-buttons/NewGroupChatButton";
import Stomp from "../components/websocket/Stomp";

export default function MainPage() {
    function newChat(user) {
        console.log("New chat with user:");
        console.log(user);
    }

    function newGroupChat(users) {
        console.log("New group chat with users:");
        console.log(users);
    }


    return (
        <>
            <Header/>
            <div className="main_content">
                <Card className="pageCard shadow-lg p-3 bg-light rounded">
                <Container>
                    <div className="content">
                        <Stack direction="horizontal" gap={2} className="m-2">
                            <NewChatButton addNewChatFunction={newChat}/>
                            <NewGroupChatButton addNewGroupChatFunction={newGroupChat}/>
                        </Stack>
                        <Card className="bg-light rounded" id="chats-card">
                            <AllChats/>
                            {/*<WebSocket />*/}
                            {/*<WebSocketComponent />*/}
                            {/*<WebSocketTest />*/}
                            {/*<Stomp />*/}
                        </Card>

                        <div className="card_bottom"></div>
                    </div>
                </Container>
                </Card>
            </div>
            <Footer />
        </>
    );
}