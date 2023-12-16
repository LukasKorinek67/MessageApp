package com.korinek.message_app.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class User {
    private String uid;
    private String username;
    private String email;
    private String provider;
}
