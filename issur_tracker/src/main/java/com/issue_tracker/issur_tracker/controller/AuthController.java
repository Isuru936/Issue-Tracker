//package com.issue_tracker.issur_tracker.controller;
//
//import com.issue_tracker.issur_tracker.model.Handler;
//import com.issue_tracker.issur_tracker.service.HandlerService;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@CrossOrigin(origins = "http://localhost:3000")
//@RestController
//@RequestMapping("api/v1")
//public class AuthController {
//
//    private final HandlerService handlerService;
//    private final BCryptPasswordEncoder passwordEncoder;
//
//    @Autowired
//    public AuthController(HandlerService handlerService, BCryptPasswordEncoder passwordEncoder) {
//        this.handlerService = handlerService;
//        this.passwordEncoder = passwordEncoder;
//    }
//
//    @PostMapping("/login")
//    public boolean login(@RequestBody LoginRequest loginRequest) {
//        Handler handler = handlerService.findByEmail(loginRequest.getEmail());
//        if (handler != null && passwordEncoder.matches(loginRequest.getPassword(), handler.getPassword())) {
//            // Authentication successful
//            return true;
//        }
//        // Authentication failed
//        return false;
//    }
//
//
//    static class LoginRequest {
//        private String email;
//        private String password;
//
//
//    }
//}
