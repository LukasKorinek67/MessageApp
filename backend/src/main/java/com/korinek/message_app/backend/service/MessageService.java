package com.korinek.message_app.backend.service;

import com.korinek.message_app.backend.model.Message;
import com.korinek.message_app.backend.model.dto.MessageDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.repository.MessageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MessageService {

    private final MessageRepository messageRepository;
    private final FirebaseUserService firebaseUserService;

    @Autowired
    public MessageService(MessageRepository messageRepository, FirebaseUserService firebaseUserService) {
        this.messageRepository = messageRepository;
        this.firebaseUserService = firebaseUserService;
    }

    public void saveMessage(MessageDTO messageDto) {
        // předělat na Message a uložit do databáze
        Message message = convertMessageDtoToMessage(messageDto);
        messageRepository.save(message);
    }

    public void setMessageRead(MessageDTO messageDto) {
        if(messageDto.isRead()) {
            // předělat na Message a udělat update do databáze
            Message message = convertMessageDtoToMessage(messageDto);
            messageRepository.save(message);
        }
    }

    public List<MessageDTO> getMessagesByChatId(String chatUid) {
        List<Message> messages = messageRepository.findByChatUid(chatUid);
        List<MessageDTO> messagesDTO = new ArrayList<>();
        for (Message message:messages) {
            messagesDTO.add(convertMessageToMessageDto(message));
        }
        return messagesDTO;
    }

    public int getNumberOfUnreadMessagesFromChat(String uid) {
        return this.messageRepository.getNumberOfUnreadMessages(uid);
    }

    private MessageDTO convertMessageToMessageDto(Message message) {
        MessageDTO messageDTO = new MessageDTO(
                message.getUid(),
                getUserByUserUid(message.getSenderUid()),
                message.getText(),
                message.getTime(),
                message.isRead(),
                message.getChatUid()
        );
        return messageDTO;
    }

    private Message convertMessageDtoToMessage(MessageDTO messageDTO) {
        Message message = new Message(
                messageDTO.getUid(),
                messageDTO.getUser().getUid(),
                messageDTO.getText(),
                messageDTO.getTime(),
                messageDTO.isRead(),
                messageDTO.getChatUid());
        return message;
    }

    private UserDTO getUserByUserUid(String uid) {
        return this.firebaseUserService.getUserByUid(uid);
    }
}
