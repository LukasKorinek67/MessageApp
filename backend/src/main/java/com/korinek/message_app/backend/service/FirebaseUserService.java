package com.korinek.message_app.backend.service;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.ListUsersPage;
import com.google.firebase.auth.UserRecord;
import com.korinek.message_app.backend.model.User;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FirebaseUserService {

    public List<User> getAllUsers() {
        List<User> allUsers = new ArrayList<>();
        try {
            ListUsersPage page = FirebaseAuth.getInstance().listUsers(null);
            for (UserRecord userRecord : page.getValues()) {
                allUsers.add(this.getUserFromUserRecord(userRecord));
            }
        } catch(FirebaseAuthException e) {
            e.printStackTrace();
        }
        return allUsers;
    }

    public User getUserByUid(String uid) {
        try {
            UserRecord userRecord = FirebaseAuth.getInstance().getUser(uid);
            User user = this.getUserFromUserRecord(userRecord);
            return user;
        } catch(FirebaseAuthException e) {
            e.printStackTrace();
            return null;
        }
    }

    private User getUserFromUserRecord(UserRecord userRecord) {
        return new User(
                userRecord.getUid(),
                userRecord.getDisplayName(),
                userRecord.getEmail(),
                userRecord.getProviderData()[0].getProviderId()
        );
    }
}
