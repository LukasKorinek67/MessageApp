package com.korinek.message_app.backend.service;

import com.korinek.message_app.backend.model.dto.ChatDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.repository.ChatRepository;
import com.korinek.message_app.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    /*private final ChatRepository chatRepository;

    @Autowired
    public ChatService(ChatRepository chatRepository) {
        this.chatRepository = chatRepository;
    }
    */
    public ResponseEntity<List<ChatDTO>> getAllUsersChats(UserDTO user) {
        throw new UnsupportedOperationException("Not implemented yet!");
    }
}
