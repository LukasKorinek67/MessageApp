package com.korinek.message_app.backend.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
    private String uid;
    private String username;
    private String email;
    // odebrat token a accessToken
    private String token;
    private String accessToken;
    private String provider;
}
