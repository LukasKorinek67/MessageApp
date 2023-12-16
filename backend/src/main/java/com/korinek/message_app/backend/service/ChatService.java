package com.korinek.message_app.backend.service;

import com.korinek.message_app.backend.model.Chat;
import com.korinek.message_app.backend.model.Message;
import com.korinek.message_app.backend.repository.ChatRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatService {

    private final ChatRepository chatRepository;
    private final MessageService messageService;

    @Autowired
    public ChatService(ChatRepository chatRepository, MessageService messageService) {
        this.chatRepository = chatRepository;
        this.messageService = messageService;
    }

    public List<Chat> getAllUsersChats(String userUid) {
        return this.chatRepository.findByUsersUid(userUid);
    }

    public void updateLastMessage(String chatUid, Message message) {
        Chat chat = getChatByUid(chatUid);
        chat.setLastMessage(message);
        this.chatRepository.save(chat);
    }

    public void createChat(Chat chat) {
        this.chatRepository.save(chat);
    }

    public void setLastMessageRead(String chatUid, Message message) {
        Chat chat = getChatByUid(chatUid);
        if(chat.getLastMessage().getUid().equals(message.getUid())) {
            if(message.isRead()) {
                chat.setLastMessage(message);
                this.chatRepository.save(chat);
            }
        }
        // Jinak ne! Mohla už by tam bejt další jiná zpráva!
    }

    public List<Message> getChatMessages(String chatUid) {
        return this.messageService.getMessagesByChatId(chatUid);
    }

    private Chat getChatByUid(String chatUid) {
        return this.chatRepository.findByUid(chatUid);
    }

    public int getNumberOfUnreadMessages(String uid) {
        return this.messageService.getNumberOfUnreadMessagesFromChat(uid);
    }
}
