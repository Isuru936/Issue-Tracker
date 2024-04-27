package com.its.its.Service;

import com.its.its.dto.LoginDto;
import com.its.its.dto.SignUpDto;

public interface AuthService {
    String login (LoginDto loginDto);
    String register(SignUpDto signUpDto);
}
