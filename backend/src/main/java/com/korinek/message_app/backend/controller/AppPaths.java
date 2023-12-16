package com.korinek.message_app.backend.controller;

public interface AppPaths {

    String USER_GET_ALL_USERS_PATH = "user/allUsers";

    String CHAT_CREATE_CHAT = "chat/create";
    String CHAT_GET_ALL_USERS_CHAT = "chat/allChats";
    String CHAT_GET_MESSAGES = "chat/messages/{uid}";
    String CHAT_GET_NUMBER_UNREAD_MESSAGES = "chat/messages/unread-number/{uid}";
}
