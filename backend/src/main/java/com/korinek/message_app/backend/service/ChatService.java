package com.korinek.message_app.backend.service;

import com.korinek.message_app.backend.model.Chat;
import com.korinek.message_app.backend.model.Message;
import com.korinek.message_app.backend.model.dto.ChatDTO;
import com.korinek.message_app.backend.model.dto.MessageDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageService messageService;
    private final FirebaseUserService firebaseUserService;

    @Autowired
    public ChatService(ChatRepository chatRepository, MessageService messageService, FirebaseUserService firebaseUserService) {
        this.chatRepository = chatRepository;
        this.messageService = messageService;
        this.firebaseUserService = firebaseUserService;
    }

    public List<ChatDTO> getAllUsersChats(String userUid) {
        List<Chat> chats = this.chatRepository.findByUsersUid(userUid);
        List<ChatDTO> chatsDTOs = new ArrayList<>();
        for (Chat chat:chats) {
            chatsDTOs.add(convertChatToChatDto(chat));
        }
        return chatsDTOs;
    }

    public void updateLastMessage(String chatUid, MessageDTO messageDTO) {
        Chat chat = getChatByUid(chatUid);
        chat.setLastMessage(messageDTO);
        this.chatRepository.save(chat);
    }

    public void createChat(ChatDTO chatDTO) {
        Chat chat = convertChatDtoToChat(chatDTO);
        this.chatRepository.save(chat);
    }

    public void setLastMessageRead(String chatUid, MessageDTO message) {
        Chat chat = getChatByUid(chatUid);
        if(chat.getLastMessage().getUid().equals(message.getUid())) {
            if(message.isRead()) {
                chat.setLastMessage(message);
                this.chatRepository.save(chat);
            }
        }
        // Jinak ne! Mohla už by tam bejt další jiná zpráva!
    }

    public List<MessageDTO> getChatMessages(String chatUid) {
        return this.messageService.getMessagesByChatId(chatUid);
    }

    private Chat getChatByUid(String chatUid) {
        return this.chatRepository.findByUid(chatUid);
        //return this.chatRepository.findById(chatId).get();
    }

    public int getNumberOfUnreadMessages(String uid) {
        return this.messageService.getNumberOfUnreadMessagesFromChat(uid);
    }

    private ChatDTO convertChatToChatDto(Chat chat) {
        ChatDTO chatDTO = new ChatDTO(
                chat.getUid(),
                getUsersFromUids(chat.getUsersUids()),
                chat.getLastMessage()
        );
        return chatDTO;
    }

    private Chat convertChatDtoToChat(ChatDTO chatDTO) {
        Chat chat = new Chat(
                chatDTO.getUid(),
                getUsersUids(chatDTO.getUsers()),
                chatDTO.getLastMessage()
        );
        return chat;
    }

    private List<UserDTO> getUsersFromUids(List<String> usersUids) {
        List<UserDTO> users = new ArrayList<>();
        for (String uid:usersUids) {
            users.add(getUserByUserUid(uid));
        }
        return users;
    }

    private UserDTO getUserByUserUid(String uid) {
        return this.firebaseUserService.getUserByUid(uid);
    }

    private List<String> getUsersUids(List<UserDTO> users) {
        List<String> usersUids = new ArrayList<>();
        for (UserDTO user:users) {
            usersUids.add(user.getUid());
        }
        return usersUids;
    }
}
