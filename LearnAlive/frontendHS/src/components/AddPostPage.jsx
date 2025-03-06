import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAllPosts } from "../api/postApi"; // 게시글 추가 API

function AddPostPage() {
  const { boardId } = useParams(); // URL에서 boardId 가져오기
  const navigate = useNavigate(); // 페이지 이동을 위한 navigate 훅
  const [title, setTitle] = useState(""); // 게시글 제목 상태
  const [content, setContent] = useState(""); // 게시글 내용 상태

  // 게시글 추가 함수
  const handleAddPost = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지

    try {
      await getAllPosts({ boardId, title, content }); // 게시글 추가 API 호출
      navigate(`/board/${boardId}`); // 게시글 추가 후 PostPage로 이동
    } catch (error) {
      console.error("게시글 추가 실패:", error);
      alert("게시글 추가에 실패했습니다.");
    }
  };

  return (
    <div>
      <h2>게시글 추가</h2>
      <form onSubmit={handleAddPost}>
        <div>
          <label>제목</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>내용</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>
        <button type="submit">게시글 추가</button>
      </form>
    </div>
  );
}

export default AddPostPage;
