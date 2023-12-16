package com.korinek.message_app.backend.model;

import com.korinek.message_app.backend.model.dto.MessageDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;


@AllArgsConstructor
@Data
@Document(collection = "chats")
public class Chat {
    @Id
    private String uid;
    private List<String> usersUids;
    private MessageDTO lastMessage;
}
