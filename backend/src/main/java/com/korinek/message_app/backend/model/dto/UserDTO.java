package com.korinek.message_app.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private String uid;
    private String username;
    private String email;
    private String provider;
}
