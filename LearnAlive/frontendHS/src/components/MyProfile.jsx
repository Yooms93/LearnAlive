import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

const MyProfile = () => {
  const { user, setUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ✅ user.role이 professor인지 student인지 체크 후 API 호출
  useEffect(() => {
    const fetchUserData = async () => {
      if (!user || !user.userId || !user.role) return;

      try {
        const response = await axios.get(`http://localhost:8080/api/mypage/user/${user.userId}/${user.role}`);
        setUserData(response.data);
      } catch (error) {
        console.error("마이페이지 데이터 불러오기 실패:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user?.userId, user?.role]); // ✅ user의 ID나 role이 변경될 때 실행

  const openModal = () => {
    setEmail(userData?.email || "");
    setPhone(userData?.phone || "");
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const openPasswordModal = () => {
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordModal(true);
  };
  const closePasswordModal = () => setShowPasswordModal(false);

  const updateUser = async ({ email, phone }) => {
    try {
      const response = await axios.post("http://localhost:8080/api/mypage/update-user", {
        email,
        phone,
        userId: user.userId,
        role: user.role
      });

      setUser(response.data);
      setUserData(response.data);
      alert("내 정보가 변경되었습니다.");
      closeModal();
    } catch (error) {
      console.error("정보 변경 실패:", error);
      alert("정보 변경 중 오류가 발생했습니다.");
    }
  };

  const handleSave = () => {
    updateUser({ email, phone });
  };

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      await axios.post("http://localhost:8080/api/mypage/update-password", {
        userId: user.userId,
        newPassword
      });
      alert("비밀번호가 변경되었습니다.");
      closePasswordModal();
    } catch (error) {
      console.error("비밀번호 변경 실패:", error);
      alert("비밀번호 변경 중 오류가 발생했습니다.");
    }
  };

  return (
    <div>
      <h2> 내 정보 </h2>
      {loading ? (
        <p>로딩 중...</p>
      ) : (
        <table border="1">
          <tbody>
            <tr>
              <td> <strong> 이름 </strong> </td>
              <td> {userData?.name || "정보 없음"} </td>
            </tr>
            <tr>
              <td> <strong> 학번/교번(아이디) </strong> </td>
              <td> {user?.userId || "정보 없음"} </td>
            </tr>
            <tr>
              <td> <strong> 단과대학 </strong> </td>
              <td> {userData?.university || "정보 없음"} </td>
            </tr>
            <tr>
              <td> <strong> 학과 </strong> </td>
              <td> {userData?.department || "정보 없음"} </td>
            </tr>
            <tr>
              <td> <strong> 이메일 </strong> </td>
              <td> {userData?.email || "정보 없음"} </td>
            </tr>
            <tr>
              <td> <strong> 연락처 </strong> </td>
              <td> {userData?.phone || "정보 없음"} </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* 내 정보 변경 버튼 */}
      <button onClick={openModal}> 내 정보 변경 </button>
      {/* 비밀번호 변경 버튼 */}
      <button onClick={openPasswordModal}> 비밀번호 변경 </button>

      {/* 내 정보 변경 모달 */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3> 내 정보 변경 </h3>
            <label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일"
              />
            </label>
            <br />
            <label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="연락처"
              />
            </label>
            <br />
            <button onClick={handleSave}> 저장 </button>
            <button onClick={closeModal}> 취소 </button>
          </div>
        </div>
      )}

      {/* 비밀번호 변경 모달 */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3> 비밀번호 변경 </h3>
            <label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="새 비밀번호"
              />
            </label>
            <br />
            <label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
              />
            </label>
            <br />
            <button onClick={handlePasswordChange}> 저장 </button>
            <button onClick={closePasswordModal}> 취소 </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyProfile;
