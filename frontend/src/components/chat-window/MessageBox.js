import React, { useState } from 'react';

import EmojiPicker from 'emoji-picker-react';
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import BootstrapIcons from "../../utils/BootstrapIcons";
import * as strings from "../../strings/strings";
import SendMessageButton from "../buttons/logo-buttons/SendMessageButton";


export default function MessageBox({ onMessageSend }) {
    const [message, setMessage] = useState("");
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);

    function onButtonClick(){
        if(message !== "") {
            onMessageSend(message);
            setMessage("");
        }
    }

    function onEmojiSymbolClick(){
        setShowEmojiPicker(!showEmojiPicker);
    }

    const onEmojiSelection = (emojiObject, event) => {
        setMessage((message) => message + emojiObject.emoji);
        setShowEmojiPicker(false);
      };

    function getEmojiPickerTheme(){
        const rootElement = document.getElementById("root");
        const actualTheme = rootElement.getAttribute("data-bs-theme");
        if(actualTheme.includes("dark")){
            return "dark";
        } else {
            return "light";
        }
    }

    return (
        <>
            <Form>
                <Form.Group className="mb-3" controlId="formformMessage">
                    {showEmojiPicker &&
                        <EmojiPicker onEmojiClick={onEmojiSelection} theme={getEmojiPickerTheme()}/>
                    }
                    <Stack direction="horizontal" gap={2} className="m-2">
                        <div onClick={onEmojiSymbolClick} className="text-primary">{BootstrapIcons.emoji(20,20)}</div>
                        <Form.Control placeholder={strings.SEND_MESSAGE_PLACEHOLDER} as="textarea" rows={1} value={message} onChange={(e) => setMessage(e.target.value)} />
                        <SendMessageButton onClick={onButtonClick} />
                    </Stack>
                </Form.Group>
            </Form>
        </>
    );
}