package com.korinek.message_app.backend.service;

import com.google.firebase.auth.*;
import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {

    /*private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }*/


    public void addNewUser(UserDTO user) {
        //chci aby přišel UserDTO nebo User? - asi spíš DTO a do Repository půjde teprve User object
        throw new UnsupportedOperationException("Not implemented yet!");
    }

    public List<UserDTO> getAllUsers() {
        List<UserDTO> allUsers = new ArrayList<>();
        try {
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            for (UserRecord userRecord : page.getValues()) {
                allUsers.add(new UserDTO(userRecord.getUid(),
                        userRecord.getDisplayName(),
                        userRecord.getEmail(),
                        "",
                        "",
                        userRecord.getProviderData()[0].getProviderId()));
            }
        } catch(FirebaseAuthException e) {
            e.printStackTrace();
        }
        return allUsers;
    }
}
