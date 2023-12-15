package com.korinek.message_app.backend.controller;

import com.korinek.message_app.backend.model.dto.UserDTO;
import com.korinek.message_app.backend.service.UserService;
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
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*@GetMapping(path=AppPaths.USER_GET_ALL_USERS_PATH)
    public ResponseEntity<List<UserDTO>> getAllUsers(){
        return new ResponseEntity<>(this.userService.getAllUsers(), HttpStatus.OK);
    }*/

    @GetMapping(path=AppPaths.USER_GET_ALL_USERS_PATH)
    public ResponseEntity<List<UserDTO>> getAllUsers(Principal principal){
        System.out.println("Principal - getAllUsers():");
        System.out.println(principal.getName());
        return new ResponseEntity<>(this.userService.getAllUsers(), HttpStatus.OK);
    }
}
