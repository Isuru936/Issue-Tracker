package com.issue_tracker.issur_tracker.service;

import com.issue_tracker.issur_tracker.dto.LoginDto;
import com.issue_tracker.issur_tracker.dto.SignUpDto;

public interface AuthService {
    String login (LoginDto loginDto);
    String register(SignUpDto signUpDto);
}
