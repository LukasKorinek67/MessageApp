package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.User;
import com.korinek.message_app.backend.service.FirebaseUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path="api")
public class UserController {
    private final FirebaseUserService firebaseUserService;

    @Autowired
    public UserController(FirebaseUserService firebaseUserService) {
        this.firebaseUserService = firebaseUserService;
    }

    @GetMapping(path=AppPaths.USER_GET_ALL_USERS_PATH)
    public ResponseEntity<List<User>> getAllUsers(Principal principal){
        System.out.println("Principal - getAllUsers():");
        System.out.println(principal.getName());
        return new ResponseEntity<>(this.firebaseUserService.getAllUsers(), HttpStatus.OK);
    }
}
