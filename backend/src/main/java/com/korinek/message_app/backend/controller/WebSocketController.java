package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.dto.MessageDTO;
import com.korinek.message_app.backend.service.ChatService;
import com.korinek.message_app.backend.service.WebSocketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class WebSocketController {

    private final WebSocketService websocketService;

    @Autowired
    public WebSocketController(WebSocketService websocketService) {
        this.websocketService = websocketService;
    }

    @MessageMapping("/chat/{uid}")
    @SendTo("/topic/messages/{uid}")
    public MessageDTO sendMessage(@DestinationVariable String uid, MessageDTO message) {
        // jen pro simulaci
        try{
            Thread.sleep(500);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
        websocketService.messageReceived(uid, message);
        return message;
    }
}
