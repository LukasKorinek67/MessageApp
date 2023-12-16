package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.Chat;
import com.korinek.message_app.backend.model.Message;
import com.korinek.message_app.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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


    @PostMapping(path=AppPaths.CHAT_CREATE_CHAT)
    public ResponseEntity<Chat> createChat(@RequestBody Chat chat) {
        //try {
            this.chatService.createChat(chat);
            return new ResponseEntity<>(HttpStatus.CREATED);
        /*} catch(DuplicateKeyException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }*/
    }

    @GetMapping(path=AppPaths.CHAT_GET_ALL_USERS_CHAT)
    public ResponseEntity<List<Chat>> getAllUsersChats(Principal principal) {
        String userUid = principal.getName();
        return new ResponseEntity<>(this.chatService.getAllUsersChats(userUid), HttpStatus.OK);
    }

    @GetMapping(path=AppPaths.CHAT_GET_MESSAGES)
    public ResponseEntity<List<Message>> getChatMessages(@PathVariable("uid") String uid, Principal principal) {
        String userUid = principal.getName();
        return new ResponseEntity<>(this.chatService.getChatMessages(uid), HttpStatus.OK);
    }

    @GetMapping(path=AppPaths.CHAT_GET_NUMBER_UNREAD_MESSAGES)
    public ResponseEntity<Integer> getNumberOfUnreadMessages(@PathVariable("uid") String uid, Principal principal) {
        String userUid = principal.getName();
        return new ResponseEntity<>(this.chatService.getNumberOfUnreadMessages(uid), HttpStatus.OK);
    }

}
