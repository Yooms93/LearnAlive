package com.lms.attendance.controller;

import com.lms.attendance.model.Attendance;
import com.lms.attendance.service.AttendanceService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    private final AttendanceService attendanceService;

    public AttendanceController(AttendanceService attendanceService) {
        this.attendanceService = attendanceService;
    }

    @GetMapping("/class/{classId}/date/{date}")
    public ResponseEntity<List<Attendance>> getAttendanceByClassAndDate(
            @PathVariable("classId") int classId, 
            @PathVariable("date") String date) {

        List<Attendance> attendanceList = attendanceService.getAttendanceByClassAndDate(classId, date);

        if (attendanceList.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(attendanceList);
        }
        return ResponseEntity.ok(attendanceList);
    }

    // ✅ 학생이 직접 출석하는 API
    @PostMapping("/check-in")
    public ResponseEntity<Map<String, Object>> checkIn(@RequestBody Attendance request) {
        System.out.println("📅 서버에서 받은 출석 요청 데이터: " + request);

        // ✅ 서버가 받은 date 값이 올바른지 확인
        System.out.println("📌 받은 student_id: " + request.getStudentId());
        System.out.println("📌 받은 class_id: " + request.getClassId());
        System.out.println("📌 받은 date: " + request.getDate());

        Map<String, Object> response = attendanceService.studentCheckIn(request);
        return ResponseEntity.ok(response);
    }


 // ✅ 출석 상태(state) 변경
    @PutMapping("/{attendanceId}/state")
    public ResponseEntity<?> updateAttendanceState(
        @PathVariable("attendanceId") int attendanceId, // ← 명시적으로 변수명 추가
        @RequestBody Map<String, String> payload
    ) {
        String state = payload.get("state");
        if (state == null || state.isEmpty()) {
            return ResponseEntity.badRequest().body("출석 상태 값이 누락되었습니다.");
        }
        attendanceService.updateAttendanceState(attendanceId, state);
        return ResponseEntity.ok("출석 상태 업데이트 성공");
    }

    // ✅ 출석 사유(reason) 변경
    @PutMapping("/{attendanceId}/reason")
    public ResponseEntity<?> updateAttendanceReason(
        @PathVariable("attendanceId") int attendanceId, // ← 명시적으로 변수명 추가
        @RequestBody Map<String, String> payload
    ) {
        String reason = payload.get("reason");
        if (reason == null || reason.isEmpty()) {
            return ResponseEntity.badRequest().body("출석 사유 값이 누락되었습니다.");
        }
        attendanceService.updateAttendanceReason(attendanceId, reason);
        return ResponseEntity.ok("출석 사유 업데이트 성공");
    }


    // ✅ 출석 기록 추가
    @PostMapping("/add")
    public ResponseEntity<?> addAttendance(@RequestBody Attendance request) {
        attendanceService.addAttendance(request);
        return ResponseEntity.ok("출석 기록 추가 완료");
    }

    // ✅ 출석 기록 삭제 API
    @DeleteMapping("/{attendanceId}")
    public ResponseEntity<?> deleteAttendance(@PathVariable("attendanceId") int attendanceId) {
        attendanceService.deleteAttendance(attendanceId);
        return ResponseEntity.ok("출석 기록 삭제 성공");
    }
}
