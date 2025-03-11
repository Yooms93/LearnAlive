package com.lms.attendance.repository;

import java.util.Optional;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Result;
import org.apache.ibatis.annotations.Results;
import org.apache.ibatis.annotations.Select;

import com.lms.attendance.model.User;

@Mapper
public interface AuthMapper {
	@Select("SELECT student_id AS userId, name, 'student' AS role FROM Student WHERE student_id = #{userId} LIMIT 1")
	@Results({
	    @Result(column = "userId", property = "userId"),
	    @Result(column = "name", property = "name"),
	    @Result(column = "role", property = "role") // ✅ role을 명확하게 매핑
	})
	Optional<User> findUserById(String userId);
    
 // ✅ 교수자 로그인 시 비밀번호 검증 (단일 조회)
    @Select("SELECT prof_id AS userId, name, 'professor' AS role, password FROM Professor WHERE prof_id = #{userId}")
    User findProfessorById(String userId);
}
