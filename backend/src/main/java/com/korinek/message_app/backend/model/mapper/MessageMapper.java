package com.korinek.message_app.backend.model.mapper;

import com.korinek.message_app.backend.model.Message;
import com.korinek.message_app.backend.model.dto.MessageDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.service.FirebaseUserService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.print.attribute.standard.Destination;
import java.time.LocalDateTime;

public class MessageMapper {}
/*
@Component
public class MessageMapper {

    private final ModelMapper modelMapper;
    private final FirebaseUserService firebaseUserService;

    @Autowired
    public MessageMapper(FirebaseUserService firebaseUserService) {
        this.modelMapper = new ModelMapper();
        this.firebaseUserService = firebaseUserService;
        modelMapper.typeMap(MessageDTO.class, Message.class).addMappings(mapper -> {
            mapper.map(src -> src.getUid(),
                    Message::setUid);
            mapper.map(src -> src.getUser().getUid(),
                    Message::setSenderUid);
            mapper.map(src -> src.getText(),
                    Message::setText);
            mapper.map(src -> src.getTime(),
                    Message::setTime);
            mapper.map(src -> src.isRead(),
                    Message::setRead);
            mapper.map(src -> src.getChatId(),
                    Message::setChatId);
        });
        modelMapper.typeMap(Message.class, MessageDTO.class).addMappings(mapper -> {
            mapper.map(src -> src.getUid(),
                    MessageDTO::setUid);
            mapper.map(src -> getUserByUserUid(src.getSenderUid()),
                    MessageDTO::setUser);
            mapper.map(src -> src.getText(),
                    MessageDTO::setText);
            mapper.map(src -> src.getTime(),
                    MessageDTO::setTime);
            mapper.map(src -> src.isRead(),
                    MessageDTO::setRead);
            mapper.map(src -> src.getChatId(),
                    MessageDTO::setChatId);
        });
    }

    private UserDTO getUserByUserUid(String uid) {
        return this.firebaseUserService.getUserByUid(uid);
    }

    public Message convertMessageDtoToMessage(MessageDTO messageDTO) {
        return this.modelMapper.map(messageDTO, Message.class);
    }

    public MessageDTO convertMessageToMessageDTO(Message message) {
        return this.modelMapper.map(message, MessageDTO.class);
    }
}
*/
