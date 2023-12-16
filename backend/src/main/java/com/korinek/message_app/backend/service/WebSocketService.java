package com.korinek.message_app.backend.service;

import com.korinek.message_app.backend.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class WebSocketService {

    private final ChatService chatService;
    private final MessageService messageService;

    @Autowired
    public WebSocketService(ChatService chatService, MessageService messageService) {
        this.chatService = chatService;
        this.messageService = messageService;
    }

    public void messageReceived(String chatUid, Message message) {
        // pokud není přečtená - uložit do databáze
        if(!message.isRead()) {
            System.out.println("Tuhle uložim:");
            System.out.println(message);
            messageService.saveMessage(message);
            chatService.updateLastMessage(chatUid, message);
        } else {
            // pokud přišla přečtená zpráva - je to moje "oznámení o přečtení od toho komu přišla
            System.out.println("Tohle je jen read oznámení:");
            System.out.println(message);
            messageService.setMessageRead(message);
            chatService.setLastMessageRead(chatUid, message);
        }
    }
}
