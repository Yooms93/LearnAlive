package com.lms.attendance.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lms.attendance.model.MyPage;
import com.lms.attendance.repository.MyProfileMapper;

@Service
public class MyProfileService {
    private final MyProfileMapper myProfileMapper;

    public MyProfileService(MyProfileMapper myProfileMapper) {
        this.myProfileMapper = myProfileMapper;
    }

    public MyPage getUserById(String userId, String role) {
        return "professor".equals(role) ? myProfileMapper.findProfessorById(userId) : myProfileMapper.findStudentById(userId);
    }

    public MyPage updateUser(MyPage myPage) {
        int updatedCount = "professor".equals(myPage.getRole())
            ? myProfileMapper.updateProfessor(myPage.getUserId(), myPage.getEmail(), myPage.getPhone())
            : myProfileMapper.updateStudent(myPage.getUserId(), myPage.getEmail(), myPage.getPhone());

        return updatedCount > 0 ? getUserById(myPage.getUserId(), myPage.getRole()) : null;
    }
    
    // 비밀번호 변경
    public boolean updatePassword(String userId, String newPassword) {
        int updatedCount = myProfileMapper.updatePassword(userId, newPassword);
        return updatedCount > 0;
    }
    
    // userId에 해당하는 강의실 목록을 반환하는 메서드 추가
    public List<String> getClassByClassId(String classId) {
        return myProfileMapper.findClassByClassId(classId);
    }
}