package com.korinek.message_app.backend.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import com.korinek.message_app.backend.model.dto.UserDTO;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseUserService {

    public List<UserDTO> getAllUsers() {
        List<UserDTO> allUsers = new ArrayList<>();
        try {
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            for (UserRecord userRecord : page.getValues()) {
                allUsers.add(this.getUserDTOFromUserRecord(userRecord));
            }
        } catch(FirebaseAuthException e) {
            e.printStackTrace();
        }
        return allUsers;
    }

    public UserDTO getUserByUid(String uid) {
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);
            UserDTO user = this.getUserDTOFromUserRecord(userRecord);
            return user;
        } catch(FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }

    private UserDTO getUserDTOFromUserRecord(UserRecord userRecord) {
        return new UserDTO(
                userRecord.getUid(),
                userRecord.getDisplayName(),
                userRecord.getEmail(),
                userRecord.getProviderData()[0].getProviderId()
        );
    }
}
