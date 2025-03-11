package com.lms.attendance.service;

import com.lms.attendance.model.User;
import com.lms.attendance.repository.AuthMapper;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final AuthMapper authMapper;

    public AuthService(AuthMapper authMapper) {
        this.authMapper = authMapper;
    }

    public Optional<User> findUserById(String userId) {
        return authMapper.findUserById(userId);
    }
    
    // ✅ 교수자 로그인 (비밀번호 검증)
    public User loginProfessor(String userId, String password) {
        User user = authMapper.findProfessorById(userId);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null; // 비밀번호 틀림
    }
}
