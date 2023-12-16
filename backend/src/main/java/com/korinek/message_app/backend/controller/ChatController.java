package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.dto.ChatDTO;
import com.korinek.message_app.backend.model.dto.MessageDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
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
    public ResponseEntity<ChatDTO> createChat(@RequestBody ChatDTO chat) {
        //System.out.println("Chtěl bych prosím vytvořit tento chat:");
        //System.out.println(chat);
        //System.out.println("A zatím s tím nic nedělám.");
        //return new ResponseEntity<>(HttpStatus.OK);

        //try {
            this.chatService.createChat(chat);
            return new ResponseEntity<>(HttpStatus.CREATED);
        /*} catch(DuplicateKeyException e){
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }*/
    }

    @GetMapping(path=AppPaths.CHAT_GET_ALL_USERS_CHAT)
    public ResponseEntity<List<ChatDTO>> getAllUsersChats(Principal principal) {
        String userUid = principal.getName();
        return new ResponseEntity<>(this.chatService.getAllUsersChats(userUid), HttpStatus.OK);
    }

    @GetMapping(path=AppPaths.CHAT_GET_MESSAGES)
    public ResponseEntity<List<MessageDTO>> getChatMessages(@PathVariable("uid") String uid, Principal principal) {
        String userUid = principal.getName();
        return new ResponseEntity<>(this.chatService.getChatMessages(uid), HttpStatus.OK);
    }

    @GetMapping(path=AppPaths.CHAT_GET_NUMBER_UNREAD_MESSAGES)
    public ResponseEntity<Integer> getNumberOfUnreadMessages(@PathVariable("uid") String uid, Principal principal) {
        String userUid = principal.getName();
        return new ResponseEntity<>(this.chatService.getNumberOfUnreadMessages(uid), HttpStatus.OK);
    }

}
