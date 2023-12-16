package com.korinek.message_app.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@AllArgsConstructor
@Data
@Document(collection = "messages")
public class Message {

    @Id
    private String uid;
    private User user;
    private String text;
    private LocalDateTime time;
    private boolean read;
    private String chatUid;
}