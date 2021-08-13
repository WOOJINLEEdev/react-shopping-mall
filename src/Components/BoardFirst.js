import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import Modal from "react-modal";
import styled from "styled-components";
import { useMediaQuery } from "react-responsive";
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

  const headersName = [
    "번호",
    "구분",
    "제목",
    "작성자",
    "등록일",
    "조회수",
    "미리보기",
  ];
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

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

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      width: calc(100% - 40px);
      height: 100%;
    }

    @media only screen and (min-width: 768px) and (max-width: 1023px) {
      width: calc(100% - 40px);
      height: 100%;
    }
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

  const getHeadersName = () => {
    if (isTablet) {
      return ["번호", "구분", "제목", "작성자", "등록일"];
    }
    if (isMobile) {
      return ["구분", "제목", "작성자", "등록일"];
    }

    return headersName;
  };

  return (
    <BoardWrap>
      <h2 className="board_first_head">커뮤니티 (Board First)</h2>
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

      <BoardTable headersName={getHeadersName()} boardLocal="first">
        {notice.map((item, i) => (
          <BoardTableRow key={i} background>
            {isTablet && (
              <BoardTableColumn>
                <GiSpeaker />
              </BoardTableColumn>
            )}
            {isPc && (
              <BoardTableColumn>
                <GiSpeaker />
              </BoardTableColumn>
            )}
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
            {isMobile && (
              <BoardTableColumn>
                {item.createDate.substring(5)}
              </BoardTableColumn>
            )}
            {isTablet && <BoardTableColumn>{item.createDate}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.createDate}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.readCount}</BoardTableColumn>}
            {isPc && (
              <BoardTableColumn>
                <button
                  type="button"
                  className="board_preview_btn"
                  onClick={() => handlePreviewBtn(item.no)}
                >
                  <span className="visually_hidden">미리보기</span>
                </button>
              </BoardTableColumn>
            )}
          </BoardTableRow>
        ))}
        {currentPosts(dataList).map((item, i) => (
          <BoardTableRow key={i}>
            {isTablet && <BoardTableColumn>{item.no}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.no}</BoardTableColumn>}
            <BoardTableColumn>{item.type}</BoardTableColumn>
            <BoardTableColumn>
              <Link to={`/post/${item.no}`} className="board_link">
                {item.title}
              </Link>
            </BoardTableColumn>
            <BoardTableColumn>{item.user}</BoardTableColumn>
            {isMobile && (
              <BoardTableColumn>
                {item.createDate.substring(5)}
              </BoardTableColumn>
            )}
            {isTablet && <BoardTableColumn>{item.createDate}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.createDate}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.readCount}</BoardTableColumn>}
            {isPc && (
              <BoardTableColumn>
                <button
                  type="button"
                  className="board_preview_btn"
                  onClick={() => handlePreviewBtn(item.no)}
                >
                  <span className="visually_hidden">미리보기</span>
                </button>
              </BoardTableColumn>
            )}
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
