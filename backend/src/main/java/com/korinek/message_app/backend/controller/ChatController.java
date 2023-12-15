package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.dto.ChatDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path="api")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping(path=AppPaths.CHAT_GET_ALL_USERS_CHAT)
    public ResponseEntity<List<ChatDTO>> getAllUsersChats(@RequestBody UserDTO user, Principal principal) {
        return chatService.getAllUsersChats(user);
    }

}
