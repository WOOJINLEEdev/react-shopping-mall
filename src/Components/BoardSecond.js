import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import BoardTable from "./BoardTable";
import BoardTableRow from "./BoardTableRow";
import BoardTableColumn from "./BoardTableColumn";
import BoardPagination from "./BoardPagination";
import BoardItemModal from "./BoardItemModal";
import useBoard from "../Hooks/useBoard";
import Loading from "./Loading";
import SearchInputBtn from "./SearchInputBtn";

Modal.setAppElement("#root");

const BoardSecond = (props) => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [selectedPreviewId, setSelectedPreviewId] = useState(1);
  const [searchClassName, setSearchClassName] = useState("search_wrap");
  const token = localStorage.getItem("token");
  const date = new Date();

  useEffect(() => {
    localStorage.setItem("board", "second");
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(item) {
    let currentPosts = 0;
    currentPosts = item.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const { board, boardError } = useBoard();
  if (boardError) return <div>failed to load</div>;
  if (!board) return <Loading />;

  const testing = () => {
    board.sort(function (a, b) {
      if (a.id < b.id) {
        return 1;
      }
      if (a.id > b.id) {
        return -1;
      }
      return 0;
    });
  };

  testing();

  const BoardWrap = styled.div`
    width: 984px;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
  `;

  const handleWriteBtn = () => {
    if (token) {
      history.push("/boardPost");
    } else {
      alert("로그인 후 이용해주세요!");
      return false;
    }
  };

  const handlePreviewBtn = (itemId) => {
    setSelectedPreviewId(itemId);
    setIsOpen(true);
  };

  const onRequestClose = () => {
    setIsOpen(false);
  };

  return (
    <BoardWrap>
      <h2 style={{ fontSize: "30px", textAlign: "center", fontWeight: "bold" }}>
        커뮤니티 (Board Second)
      </h2>
      <div className="board_write_wrap">
        <SearchInputBtn searchClassName={searchClassName} />
        <button
          type="button"
          className="board_write_btn"
          onClick={handleWriteBtn}
        >
          글쓰기
        </button>
      </div>
      <BoardItemModal
        boardItemId={selectedPreviewId}
        isOpen={isOpen}
        onRequestClose={onRequestClose}
      />

      <BoardTable
        headersName={[
          "번호",
          // "분류",
          "제목",
          "작성자",
          "등록일",
          "조회수",
          "미리보기",
        ]}
      >
        {currentPosts(board).map((item, i) => (
          <BoardTableRow key={i}>
            <BoardTableColumn>{item.id}</BoardTableColumn>
            <Link to={`/postView/${item.id}`} className="board_link">
              <BoardTableColumn>
                <span className="board_item_title">{item.title}</span>
              </BoardTableColumn>
            </Link>
            <BoardTableColumn>{item.userId}</BoardTableColumn>
            <BoardTableColumn>
              {date.getFullYear()}-
              {date.getMonth() < 9
                ? "0" + (date.getMonth() + 1)
                : date.getMonth() + 1}
              -{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
            </BoardTableColumn>
            <BoardTableColumn>{item.id}</BoardTableColumn>
            <BoardTableColumn>
              <button
                type="button"
                className="board_preview_btn"
                onClick={() => handlePreviewBtn(item.id)}
              >
                <span className="visually_hidden">미리보기</span>
              </button>
            </BoardTableColumn>
          </BoardTableRow>
        ))}
      </BoardTable>
      <BoardPagination
        postsPerPage={postsPerPage}
        totalPosts={board.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      ></BoardPagination>
    </BoardWrap>
  );
};

export default BoardSecond;
