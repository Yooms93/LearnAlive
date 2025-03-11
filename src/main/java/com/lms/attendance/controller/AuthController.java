package com.lms.attendance.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lms.attendance.model.LoginRequest;
import com.lms.attendance.model.User;
import com.lms.attendance.service.AuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    //학생 로그인(비밀번호 없음)
    @GetMapping("/{userId}")  // ✅ URL 매핑 수정
    public User getUserRole(@PathVariable("userId") String userId) {
        return authService.findUserById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을 수 없습니다."));
    }
    
 // ✅ 교수자 로그인 (비밀번호 검증)
    @PostMapping("/professor-login")
    public ResponseEntity<User> loginProfessor(@RequestBody LoginRequest request) {
        User user = authService.loginProfessor(request.getUserId(), request.getPassword());
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
