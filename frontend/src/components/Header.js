import Container from "react-bootstrap/Container";
import Stack from 'react-bootstrap/Stack';
import BootstrapIcons from "../utils/BootstrapIcons";
import LoggedUser from "./LoggedUser";
import ThemeButtons from "./buttons/ThemeButtons";
import { LoggedUserContext } from "../context/LoggedUserContext";
import { useContext } from "react";
import * as strings from "../strings/strings"

export default function Header() {
    const {loggedUser} = useContext(LoggedUserContext);

    return (
        <header>
            <Container fluid>
                <Stack direction="horizontal" gap={2}>
                    <div id="main_h" className="text-light ms-4">
                        <Stack direction="horizontal" gap={3} className="text-light">
                            {BootstrapIcons.chatWithDots(40,40)}
                            <h1 id="main_h" className="text-light fw-normal">{strings.APP_NAME}</h1>
                        </Stack>
                    </div>
                    <div className="p-2 ms-auto me-2">
                        { loggedUser &&
                            <LoggedUser />
                        }
                    </div>
                    <div className="vr text-light" />
                    <ThemeButtons />
                </Stack>
            </Container>
        </header>
    );
}
