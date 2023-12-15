package com.korinek.message_app.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class ChatDTO {
    private int id;
    private List<UserDTO> users;
    private MessageDTO lastMessage;
}
