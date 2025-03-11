import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import axios from "axios";

const MyPage = () => {
  const [classrooms, setClassrooms] = useState([]); // 강의실 리스트 상태
  const [selectedClassroom, setSelectedClassroom] = useState(""); // 선택된 강의실

  const userId = "exampleUserId"; // 실제 사용자 ID로 변경 필요

  useEffect(() => {
    const fetchClassrooms = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/mypage/classrooms/${userId}`);
        setClassrooms(response.data);
      } catch (error) {
        console.error("강의실 목록을 불러오는데 실패했습니다.", error);
      }
    };
    fetchClassrooms();
  }, [userId]);

  // 강의실 선택 시 처리
  const handleClassroomChange = (event) => {
    setSelectedClassroom(event.target.value);
  };

  return (
    <div>
      <div className="class-name">
        <h3> 강의실 선택 </h3>
        {/* 강의실 선택 dropdown */}
        <select onChange={handleClassroomChange} value={selectedClassroom}>
          <option value=""> -- 강의실 선택 -- </option>
          {classrooms.map((classroom, index) => (
            <option key={index} value={classroom}>
              {classroom}
            </option>
          ))}
        </select>
        {/* 선택한 강의실로 이동하는 링크 */}
        {selectedClassroom && (
          <Link to={`/mypage/classroom/${selectedClassroom}`}>
            <button> 선택한 강의실로 이동 </button>
          </Link>
        )}
      </div>
      <h1> 마이페이지 </h1>
      <div style={{ display: "flex", alignItems: "flex-start" }}>
        <div style={{ marginRight: "20px" }}>
          <p> <Link to="/mypage/myprofile"> <button> 내 정보 </button> </Link> </p>
          <p> <Link to="/mypage/mypost"> <button> 내 게시물 조회 </button> </Link> </p>
          <p> <Link to="/mypage/learning"> <button> 학습내역 </button> </Link> </p>
          <p> <Link to="/mypage/attendance"> <button> 출결내역 </button> </Link> </p>
          <p> <Link to="/mypage/grades"> <button> 성적 확인 </button> </Link> </p>
          <p> <Link to="/mypage/achievements"> <button> 업적 </button> </Link> </p>
        </div>
        <Outlet /> {/* 현재 선택된 서브페이지가 여기에 표시됨 */}
      </div>
    </div>
  );
};

export default MyPage;
