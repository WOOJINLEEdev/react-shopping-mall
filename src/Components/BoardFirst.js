import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import styled from "styled-components";
import BoardTable from "./BoardTable";
import BoardTableRow from "./BoardTableRow";
import BoardTableColumn from "./BoardTableColumn";
import BoardPagination from "./BoardPagination";
import BoardFirstModal from "./BoardFirstModal";
import { postList, sortedPostList } from "./BoardFirstData";
import SearchInputBtn from "./SearchInputBtn";
import BoardFilter from "./BoardFilter";
import { GiSpeaker } from "react-icons/gi";

Modal.setAppElement("#root");

const BoardFirst = (props) => {
  const [dataList, setDataList] = useState([]);
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [selectedPreviewId, setSelectedPreviewId] = useState(1);
  const [searchClassName, setSearchClassName] = useState("search_wrap");
  const [selectedOption, setSelectedOption] = useState("");

  const notice = postList.filter((data) => data.type === "공지사항");
  let searchInput = "";

  useEffect(() => {
    setDataList(sortedPostList);
    localStorage.setItem("board", "first");
  }, []);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;
  function currentPosts(item) {
    let currentPosts = 0;
    currentPosts = item.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }

  const BoardWrap = styled.div`
    width: 984px;
    height: 100%;
    margin: 0 auto;
    padding: 20px;
  `;

  const token = localStorage.getItem("token");
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

  const ModalClose = () => {
    setIsOpen(false);
  };

  const handleSelectOption = (e) => {
    if (e.target.value === "공지사항") {
      setSelectedOption("공지사항");
      console.log(selectedOption);

      if (dataList.length !== 12) {
        const a = sortedPostList.filter((data) => data.type === "공지사항");
        setDataList(a);
        return;
      }
      const b = dataList.filter((data) => data.type === "공지사항");
      setDataList(b);
    } else if (e.target.value === "일반") {
      setSelectedOption("일반");
      console.log(selectedOption);
      if (dataList.length < 12) {
        const c = sortedPostList.filter((data) => data.type === "일반");
        setDataList(c);
      } else {
        const d = dataList.filter((data) => data.type === "일반");
        setDataList(d);
      }
    } else {
      setSelectedOption("");
      console.log(selectedOption);
      setDataList(sortedPostList);
    }
  };

  const handleSearchBtn = () => {
    const searchFilter = dataList.filter((item) =>
      item.title.includes(searchInput)
    );
    setDataList(searchFilter);
  };

  const handleSearchInput = (e) => {
    const targetValue = e.target.value;
    searchInput = targetValue;
  };

  return (
    <BoardWrap>
      <h2 style={{ fontSize: "30px", textAlign: "center", fontWeight: "bold" }}>
        커뮤니티 (Board First)
      </h2>
      <div className="board_write_wrap">
        <BoardFilter
          handleSelectOption={handleSelectOption}
          selectedOption={selectedOption}
        />
        <SearchInputBtn
          searchClassName={searchClassName}
          handleSearchBtn={handleSearchBtn}
          handleSearchInput={handleSearchInput}
        />
        <button
          type="button"
          className="board_write_btn"
          onClick={handleWriteBtn}
        >
          글쓰기
        </button>
      </div>
      <BoardFirstModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        postList={postList}
        boardItemNo={selectedPreviewId}
        ModalClose={ModalClose}
      />

      <BoardTable
        headersName={[
          "번호",
          "구분",
          "제목",
          "작성자",
          "등록일",
          "조회수",
          "미리보기",
        ]}
        boardLocal="first"
      >
        {notice.map((item, i) => (
          <BoardTableRow key={i} background>
            <BoardTableColumn>
              <GiSpeaker />
            </BoardTableColumn>
            <BoardTableColumn>
              <span style={{ color: "blue", fontWeight: "bold" }}>
                {item.type}
              </span>
            </BoardTableColumn>
            <BoardTableColumn>
              <Link to={`/post/${item.no}`} className="board_link">
                <span style={{ fontWeight: "bold" }}>{item.title}</span>
              </Link>
            </BoardTableColumn>
            <BoardTableColumn>{item.user}</BoardTableColumn>
            <BoardTableColumn>{item.createDate}</BoardTableColumn>
            <BoardTableColumn>{item.readCount}</BoardTableColumn>
            <BoardTableColumn>
              <button
                type="button"
                className="board_preview_btn"
                onClick={() => handlePreviewBtn(item.no)}
              >
                <span className="visually_hidden">미리보기</span>
              </button>
            </BoardTableColumn>
          </BoardTableRow>
        ))}
        {currentPosts(dataList).map((item, i) => (
          <BoardTableRow key={i}>
            <BoardTableColumn>{item.no}</BoardTableColumn>
            <BoardTableColumn>{item.type}</BoardTableColumn>
            <BoardTableColumn>
              <Link to={`/post/${item.no}`} className="board_link">
                {item.title}
              </Link>
            </BoardTableColumn>
            <BoardTableColumn>{item.user}</BoardTableColumn>
            <BoardTableColumn>{item.createDate}</BoardTableColumn>
            <BoardTableColumn>{item.readCount}</BoardTableColumn>
            <BoardTableColumn>
              <button
                type="button"
                className="board_preview_btn"
                onClick={() => handlePreviewBtn(item.no)}
              >
                <span className="visually_hidden">미리보기</span>
              </button>
            </BoardTableColumn>
          </BoardTableRow>
        ))}
      </BoardTable>
      <BoardPagination
        postsPerPage={postsPerPage}
        totalPosts={dataList.length}
        paginate={setCurrentPage}
        currentPage={currentPage}
      />
    </BoardWrap>
  );
};

export default BoardFirst;
