package com.korinek.message_app.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class MessageDTO {
    private UserDTO user;
    private String text;
    private LocalDateTime time;
    private boolean read;
    private int chatId;
}