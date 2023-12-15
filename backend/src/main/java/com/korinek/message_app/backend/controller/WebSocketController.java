package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.dto.MessageDTO;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

import java.security.Principal;

@Controller
public class WebSocketController {
    /*
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public String sendMessage(String message) {
        System.out.println("Přišla zpráva !!! ");
        return "Ze serveru:" + message;
    }*/

    /*
    public record Message(String message) {}

    // tohle je jen nějaký default
    @MessageMapping("/chat")
    @SendTo("/topic/messages")
    public Message sendMessageDefault(Message message) {
        System.out.println("Přišla zpráva:");
        System.out.println(message.message);

        Message responseMessage = new Message("Ze serveru:" + message.message);
        return responseMessage;
    }

    @MessageMapping("/chat/{id}")
    @SendTo("/topic/messages/{id}")
    public Message sendMessageChatId(@DestinationVariable int id, Message message) {
        System.out.println("Přišla zpráva z chatu " + id + ":");
        System.out.println(message.message);

        Message responseMessage = new Message("Ze serveru:" + message.message);
        return responseMessage;
    }
    */


    // takhle si myslím, že to budu dělat:

    //public record Message(User sender, Chat chat(nebo jen id chatu?), String text, DateTime time, boolean read) {}
    //public record Message(String sender, String text, String time, boolean read, int chatId) {}

    @MessageMapping("/chat/{id}")
    @SendTo("/topic/messages/{id}")
    public MessageDTO sendMessage(@DestinationVariable int id, MessageDTO message) {

        System.out.println(message.getText());
        // jen pro simulaci
        try{
            Thread.sleep(500);
        } catch(InterruptedException e) {
            e.printStackTrace();
        }
        // uložím ji do databáze
        // posílám zpět
        return message;
        // každý chat má své vlastní WebSocket spojení - tzn. že uživatel jich má otevřených víc
        // přijde sem zpráva
        // server ji uloží do databáze
        // a následně ji pošle zpět na stejný kanál
        // není potřeba nějak zpracovat nebo něco, protože frontend ji zobrazí podle UserID (buď jako sender = přihlášený uživatel, nebo jako ostatní)

        // na frontendu by asi šlo po odeslání zprávy zobrazit rovnou tu zprávu s jednou fajfkou a čekat, až mi od serveru přijde ta moje odeslaná zpráva
        // až přijde ta odeslaná zpráva, tak vím, že byla doručena (ne přečtena) a dám 2 fajfky, pak čekám až od serveru přijde ta zpráva znova s tím read=true
    }

    /*@MessageMapping("/chat/{id}")
    @SendTo("/topic/chat/{id}")
    public Message messageRead(@DestinationVariable String chatId, Message message, boolean read) {
        // tady jen upravím v databázi tu zprávu na přečtenou a asi teda pošlu zpět - bude potřeba nějaká kontrola:
        // - když se bude jednat o zprávu přihlášeného uživatele, tak zkontroluju read/not read
        // - když mi zpráva přijde podruhý, tak můžu taky upravit ale vizuálně se nic nemění, takže asi není potřeba, aby nebyl zbytečně re-render
        // -> možná ale bude potřeba změnit na read, protože podle toho by se v tom přehledu chatů mohl ten chat zobrazovat jako nepřečtený
        return message;
    }*/
}
