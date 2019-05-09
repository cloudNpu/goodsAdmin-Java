package com.kenji.goods.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<String> Login(@RequestBody Map user) {

        String username = (String) user.get("username");
        String password = (String) user.get("password");

        if ("admin".equals(username) && "admin".equals(password)) {
            return ResponseEntity.ok().body("");
        } else {
            return ResponseEntity.badRequest().body("");
        }

    }
}
