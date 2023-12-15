package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.dto.ChatDTO;
import com.korinek.message_app.backend.model.dto.MessageDTO;
import com.korinek.message_app.backend.model.dto.UserDTO;
import org.springframework.boot.configurationprocessor.json.JSONException;
import org.springframework.boot.configurationprocessor.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

//@CrossOrigin(origins = "http://localhost:3001")
@RestController
@RequestMapping(path="api")
public class FrontendTestController {


    // test Spring Security
    @GetMapping(path = "/security")
    public String test(Principal principal) {
        System.out.println("Principal:");
        System.out.println(principal.getName());
        return "Hello";
    }


    //private record Chat (int id, String username, String lastMessage) {}

    @PostMapping(path=AppPaths.TEST_ALL_CHATS)
    public ResponseEntity<List<ChatDTO>> getAllChats(@RequestBody UserDTO loggedUser, Principal principal) {
        System.out.println("Principal - getAllChats():");
        System.out.println(principal.getName());
        UserDTO userVendy = new UserDTO("00001", "Vendy","vendy@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userBoza = new UserDTO("00002", "Bóža","boza@gmail.com", "token12345", "access12345", "google.com");
        UserDTO userHonza = new UserDTO("00003", "Honza","honza@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userMamka = new UserDTO("00004", "Mamka","mamka@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userTatka = new UserDTO("00005", "Taťka","tatka@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userFriend1 = new UserDTO("00006", "Friend no.1","friend01@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userFriend2 = new UserDTO("00007", "Friend no.2","friend02@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userFriend3 = new UserDTO("00008", "Friend no.3","friend03@gmail.com", "token1234", "access1234", "google.com");
        UserDTO userFriend4 = new UserDTO("00009", "Friend no.4","friend04@gmail.com", "token1234", "access1234", "google.com");

        ArrayList<UserDTO> chatUsers1 = new ArrayList<>();
        chatUsers1.add(loggedUser);
        chatUsers1.add(userVendy);
        ArrayList<UserDTO> chatUsers2 = new ArrayList<>();
        chatUsers2.add(loggedUser);
        chatUsers2.add(userBoza);
        ArrayList<UserDTO> chatUsers3 = new ArrayList<>();
        chatUsers3.add(loggedUser);
        chatUsers3.add(userHonza);
        ArrayList<UserDTO> chatUsers4 = new ArrayList<>();
        chatUsers4.add(loggedUser);
        chatUsers4.add(userMamka);
        ArrayList<UserDTO> chatUsers5 = new ArrayList<>();
        chatUsers5.add(loggedUser);
        chatUsers5.add(userTatka);
        ArrayList<UserDTO> chatUsers6 = new ArrayList<>();
        chatUsers6.add(loggedUser);
        chatUsers6.add(userFriend1);
        ArrayList<UserDTO> chatUsers7 = new ArrayList<>();
        chatUsers7.add(loggedUser);
        chatUsers7.add(userFriend2);
        ArrayList<UserDTO> chatUsers8 = new ArrayList<>();
        chatUsers8.add(loggedUser);
        chatUsers8.add(userFriend3);
        ArrayList<UserDTO> chatUsers9 = new ArrayList<>();
        chatUsers9.add(loggedUser);
        chatUsers9.add(userFriend4);
        ArrayList<UserDTO> chatUsers10 = new ArrayList<>();
        chatUsers10.add(loggedUser);
        chatUsers10.add(userMamka);
        chatUsers10.add(userTatka);

        ArrayList<ChatDTO> allChats = new ArrayList<>();
        /*allChats.add(new ChatDTO(1, chatUsers1, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 1)));
        allChats.add(new ChatDTO(2, chatUsers2, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 2)));
        allChats.add(new ChatDTO(3, chatUsers3, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 3)));
        allChats.add(new ChatDTO(4, chatUsers4, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 4)));
        allChats.add(new ChatDTO(5, chatUsers5, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 5)));
        allChats.add(new ChatDTO(6, chatUsers6, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 6)));
        allChats.add(new ChatDTO(7, chatUsers7, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 7)));
        allChats.add(new ChatDTO(8, chatUsers8, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 8)));
        allChats.add(new ChatDTO(9, chatUsers9, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 9)));
        allChats.add(new ChatDTO(10, chatUsers10, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, 10)));
        */
        allChats.add(new ChatDTO(1, chatUsers1, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 11, 12, 50), false, 1)));
        allChats.add(new ChatDTO(2, chatUsers2, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 10, 12, 50), false, 2)));
        allChats.add(new ChatDTO(3, chatUsers3, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 9, 12, 50), false, 3)));
        allChats.add(new ChatDTO(4, chatUsers4, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 8, 12, 50), false, 4)));
        allChats.add(new ChatDTO(5, chatUsers5, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 7, 12, 50), false, 5)));
        allChats.add(new ChatDTO(6, chatUsers6, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 6, 12, 50), false, 6)));
        allChats.add(new ChatDTO(7, chatUsers7, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 5, 12, 50), false, 7)));
        allChats.add(new ChatDTO(8, chatUsers8, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 4, 12, 50), false, 8)));
        allChats.add(new ChatDTO(9, chatUsers9, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 3, 12, 50), false, 9)));
        allChats.add(new ChatDTO(10, chatUsers10, new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 12, 2, 12, 50), false, 10)));
        return new ResponseEntity<>(allChats, HttpStatus.OK);

        /*allChats.add(new Chat(1, "Vendy", "Ahoj, jak je?"));
        allChats.add(new Chat(2, "Bóža", "Jdeš na trénink?"));
        allChats.add(new Chat(3, "Honza", "Okáčko"));
        allChats.add(new Chat(4, "Mamka", "Co děláš?"));
        allChats.add(new Chat(5, "Taťka", "Dobře, budu tam."));
        allChats.add(new Chat(6, "Friend no.1", "Díky"));
        allChats.add(new Chat(7, "Friend no.2", "Díky"));
        allChats.add(new Chat(8, "Friend no.3", "Díky"));
        allChats.add(new Chat(9, "Friend no.4", "Díky"));
        allChats.add(new Chat(10, "Friend no.5", "Díky"));
        return new ResponseEntity<>(allChats, HttpStatus.OK);*/
    }

    public record ChatMessagesRequest(UserDTO loggedUser, UserDTO user, int chatId) {}

    @PostMapping(path=AppPaths.TEST_CHAT_MESSAGES)
    public ResponseEntity<List<MessageDTO>> getChatMessages(@RequestBody ChatMessagesRequest chatMessagesRequest, Principal principal){
    //public ResponseEntity<List<MessageDTO>> getChatMessages(@RequestBody UserDTO loggedUser, @RequestBody UserDTO user, @RequestBody int chatId){
        //UserDTO userUser = new UserDTO("00001", "Vendulka","user@gmail.com", "token1234", "access1234", "google.com");
        //UserDTO userLoggedUser = new UserDTO("00002", "Lukáš Kořínek","loggedUser@gmail.com", "token12345", "access12345", "google.com");

        System.out.println("Principal - getChatMessages():");
        System.out.println(principal.getName());
        UserDTO loggedUser = chatMessagesRequest.loggedUser();
        UserDTO user = chatMessagesRequest.user();
        int chatId = chatMessagesRequest.chatId();

        ArrayList<MessageDTO> chatMessages = new ArrayList<>();
        chatMessages.add(new MessageDTO(user, "Ahoj, jak je? Co děláš?", LocalDateTime.of(2023, 10, 8, 11, 30), true, chatId));
        chatMessages.add(new MessageDTO(loggedUser, "Dobrý! Hele jdeme večer do toho kina?", LocalDateTime.of(2023, 10, 8, 11, 40), true, chatId));
        chatMessages.add(new MessageDTO(user, "Jojo, můžeme", LocalDateTime.of(2023, 10, 8, 12, 10), true, chatId));
        chatMessages.add(new MessageDTO(loggedUser, "Tak jooo", LocalDateTime.of(2023, 10, 8, 12, 31), true, chatId));
        chatMessages.add(new MessageDTO(user, "This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.", LocalDateTime.of(2023, 10, 8, 12, 46), true, chatId));
        chatMessages.add(new MessageDTO(loggedUser, "Ok", LocalDateTime.of(2023, 10, 8, 12, 50), false, chatId));

        return new ResponseEntity<>(chatMessages, HttpStatus.OK);

        /*ArrayList<Message> chatMessages = new ArrayList<>();
        chatMessages.add(new Message("user", "Ahoj, jak je? Co děláš?", "11:30", true));
        chatMessages.add(new Message("loggedUser", "Dobrý! Hele jdeme večer do toho kina?", "12:40", true));
        chatMessages.add(new Message("user", "Jojo, můžeme", "12:42", true));
        chatMessages.add(new Message("loggedUser", "Tak jooo", "12:45", false));
        chatMessages.add(new Message("user", "This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.This is a long paragraph written to show how the line-height of an element is affected by our utilities. Classes are applied to the element itself or sometimes the parent element. These classes can be customized as needed with our utility API.", "12:59", true));
        return new ResponseEntity<>(chatMessages, HttpStatus.OK);*/

    }
}
