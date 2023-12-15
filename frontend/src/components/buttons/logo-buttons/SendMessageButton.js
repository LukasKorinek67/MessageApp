import Button from "react-bootstrap/Button";
import * as strings from "../../../strings/strings";
import BootstrapIcons from "../../../utils/BootstrapIcons";
import React from "react";

export default function SendMessageButton({ onClick }) {
    return (
        <>
            <Button onClick={onClick} variant="outline-primary" title={strings.BUTTON_SEND_MESSAGE_TITLE}>{BootstrapIcons.sendMessage(20,20)}</Button>
        </>
    );

}