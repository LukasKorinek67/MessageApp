import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Stack from "react-bootstrap/Stack";

import Header from "../components/Header";
import AllChats from "../components/AllChats";
import Footer from "../components/Footer";
import NewChatButton from "../components/buttons/logo-buttons/NewChatButton";
import NewGroupChatButton from "../components/buttons/logo-buttons/NewGroupChatButton";
import Stomp from "../components/websocket/Stomp";
import requestHandler from "../services/RequestHandler";

export default function MainPage() {
    return (
        <>
            <Header/>
            <div className="main_content">
                <Card className="pageCard shadow-lg p-3 bg-light rounded">
                <Container>
                    <div className="content">
                        <AllChats/>
                        <div className="card_bottom"></div>
                    </div>
                </Container>
                </Card>
            </div>
            <Footer />
        </>
    );
}