import {StompSessionProvider} from "react-stomp-hooks";
import StompChild from "./StompChild";
import StompPublish from "./StompPublish";
import {useContext} from "react";
import {LoggedUserContext} from "../../context/LoggedUserContext";
import { Client } from 'webstomp-client';
import {useStomp} from "usestomp-hook/lib/hook";
import {StompProvider} from "usestomp-hook/lib";

export default function Stomp() {
    const {loggedUser} = useContext(LoggedUserContext);
    const authorization = `Bearer ${loggedUser.accessToken}`;
    const headers = {"Authorization": authorization};

    return (
        <>
            <StompSessionProvider
                url={process.env.REACT_APP_WEBSOCKET_URL}
            >
                <p>Hello!</p>
                {/*<StompChild />
                <StompPublish />*/}
            </StompSessionProvider>
        </>
    );
    /*const {loggedUser} = useContext(LoggedUserContext);
    const url = process.env.REACT_APP_WEBSOCKET_URL;
    const authorization = `Bearer ${loggedUser.accessToken}`;
    const headers = {Authorization: authorization};

    const client = new Client();
    client.
    client.connect({headers})*/
    //const {disconnect, subscribe, unsubscribe, subscriptions, send, isConnected} = useStomp();


    /*const stompClient = new Client({
        brokerURL: url,
        connectHeaders: headers,
    });
    stompClient.activate();
    */

    /*return (
        <>
            <StompProvider config={{ brokerURL: url, connectHeaders: headers}}>
                <p>Hello!</p>
            </StompProvider>
        </>
    );*/
}