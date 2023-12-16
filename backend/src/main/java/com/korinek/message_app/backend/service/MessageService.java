package com.korinek.message_app.backend.service;

import com.korinek.message_app.backend.model.Message;
import com.korinek.message_app.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;

    @Autowired
    public MessageService(MessageRepository messageRepository) {
        this.messageRepository = messageRepository;
    }

    public void saveMessage(Message message) {
        messageRepository.save(message);
    }

    public void setMessageRead(Message message) {
        if(message.isRead()) {
            messageRepository.save(message);
        }
    }

    public List<Message> getMessagesByChatId(String chatUid) {
        return messageRepository.findByChatUid(chatUid);
    }

    public int getNumberOfUnreadMessagesFromChat(String uid) {
        return this.messageRepository.getNumberOfUnreadMessages(uid);
    }
}
