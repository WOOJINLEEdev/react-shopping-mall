import React, { useState, useEffect, lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useMediaQuery } from "react-responsive";
import Modal from "react-modal";
import styled from "styled-components";
import BoardTable from "components/board/BoardTable";
import BoardTableRow from "components/board/BoardTableRow";
import BoardTableColumn from "components/board/BoardTableColumn";
import BoardPagination from "components/board/BoardPagination";
import { postList, sortedPostList } from "components/board/BoardFirstData";
import BoardFilter from "components/board/BoardFilter";
import SearchInputBtn from "components/search/SearchInputBtn";
import { GiSpeaker } from "@react-icons/all-files/gi/GiSpeaker";
import Loading from "components/common/Loading";
import { getToken } from "utils/token";
import useCurrentBoardPage from "hooks/useCurrentBoardPage";

Modal.setAppElement("#root");

const BoardFirstModal = lazy(() => import("components/board/BoardFirstModal"));

const BoardFirst = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const { currentBoardPageData, getCurrentBoardPage, mutateCurrentBoardPage } =
    useCurrentBoardPage();

  const initialPage = getCurrentBoardPage("first");
  const [dataList, setDataList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(initialPage);
  const [selectedPreviewId, setSelectedPreviewId] = useState(1);
  const offset = (page - 1) * limit;

  const [searchClassName, setSearchClassName] = useState("search_wrap");
  const [SearchInputClassName, setSearchInputClassName] =
    useState("board_search_input");
  const [SearchBtnClassName, setSearchBtnClassName] =
    useState("board_search_btn");
  const [selectedOption, setSelectedOption] = useState("");

  const token = getToken();
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

  useEffect(() => {
    mutateCurrentBoardPage("first", page);
  }, [page]);

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
      return ["번호", "구분", "제목", "작성자", "등록일", "조회수"];
    }
    if (isMobile) {
      return ["구분", "제목", "작성자", "등록일"];
    }

    return headersName;
  };

  return (
    <BoardWrap>
      <h2 className="board_first_head">
        커뮤니티 (Board {localStorage.getItem("board")})
      </h2>
      <div className="board_write_wrap">
        <BoardFilter
          handleSelectOption={handleSelectOption}
          selectedOption={selectedOption}
        />
        <SearchInputBtn
          searchClassName={searchClassName}
          SearchInputClassName={SearchInputClassName}
          SearchBtnClassName={SearchBtnClassName}
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
      <Suspense fallback={<Loading />}>
        <BoardFirstModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          postList={postList}
          boardItemNo={selectedPreviewId}
          ModalClose={ModalClose}
        />
      </Suspense>

      <BoardTable headersName={getHeadersName()} boardLocal="first">
        {notice.map((item, i) => (
          <BoardTableRow key={item.no} background>
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
            {isTablet && <BoardTableColumn>{item.readCount}</BoardTableColumn>}
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
        {dataList.slice(offset, offset + limit).map((item, i) => (
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
            {isTablet && <BoardTableColumn>{item.readCount}</BoardTableColumn>}
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
        total={dataList.length}
        limit={limit}
        page={page}
        setPage={setPage}
      />
    </BoardWrap>
  );
};

export default BoardFirst;

const BoardWrap = styled.div`
  width: 984px;
  min-height: calc(100vh - 271px);
  height: 100%;
  margin: 0 auto;
  padding: 50px 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 40px);
    min-height: calc(100vh - 251px);
    height: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 100px);
  }
`;
