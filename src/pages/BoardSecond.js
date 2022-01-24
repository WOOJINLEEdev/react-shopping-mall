import React, { useState, useEffect, lazy, Suspense } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useMediaQuery } from "react-responsive";
import Modal from "react-modal";
import BoardTable from "components/board/BoardTable";
import BoardTableRow from "components/board/BoardTableRow";
import BoardTableColumn from "components/board/BoardTableColumn";
import BoardPagination from "components/board/BoardPagination";
import Loading from "components/common/Loading";
import SearchInputBtn from "components/search/SearchInputBtn";
import { getToken } from "utils/token";
import axios from "axios";
import useCurrentBoardPage from "hooks/useCurrentBoardPage";
import { formatDate } from "utils/formatDate";

Modal.setAppElement("#root");

const BoardItemModal = lazy(() => import("components/board/BoardItemModal"));

const BoardSecond = () => {
  const history = useHistory();

  const { currentBoardPageData, getCurrentBoardPage, mutateCurrentBoardPage } =
    useCurrentBoardPage();

  const detectMobile = detectMobileDevice();
  const [isOpen, setIsOpen] = useState(false);
  const initialPage = getCurrentBoardPage("second");
  const [selectedPreviewId, setSelectedPreviewId] = useState(1);
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [mobileLimit, setMobileLimit] = useState(20);
  const [page, setPage] = useState(initialPage);
  const offset =
    detectMobile === true ? (page - 1) * mobileLimit : (page - 1) * limit;
  const offsetLimit =
    detectMobile === true ? offset + mobileLimit : offset + limit;

  const [searchClassName, setSearchClassName] = useState("search_wrap");
  const [SearchInputClassName, setSearchInputClassName] =
    useState("board_search_input");
  const [SearchBtnClassName, setSearchBtnClassName] =
    useState("board_search_btn");

  const token = getToken();
  const date = new Date();
  let searchInput = "";

  const headersName = [
    "번호",
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

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const reverseData = res.data.reverse();
        setPosts(reverseData);
      })
      .then((err) => console.log(err));

    localStorage.setItem("board", "second");
  }, []);

  useEffect(() => {
    mutateCurrentBoardPage("second", page);
  }, [page]);

  useEffect(() => {
    detectMobileDevice();
  }, []);

  function detectMobileDevice() {
    const minWidth = 500;

    return window.innerWidth <= minWidth;
  }

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

  const handleSearchInput = (e) => {
    const targetValue = e.target.value;
    searchInput = targetValue;
  };

  const handleSearchBtn = () => {
    const searchFilter = posts.filter((item) =>
      item.title.includes(searchInput)
    );
    console.log(searchFilter);
  };

  const getHeadersName = () => {
    if (isTablet) {
      return ["번호", "제목", "작성자", "등록일", "조회수"];
    }
    if (isMobile) {
      return ["번호", "제목", "작성자", "등록일"];
    }

    return headersName;
  };

  return (
    <BoardWrap>
      <h2 className="board_second_head">
        커뮤니티 (Board {localStorage.getItem("board")})
      </h2>
      <div className="board_write_wrap">
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
        <BoardItemModal
          boardItemId={selectedPreviewId}
          isOpen={isOpen}
          onRequestClose={onRequestClose}
        />
      </Suspense>

      <BoardTable headersName={getHeadersName()} boardLocal="second">
        {posts.slice(offset, offsetLimit).map((item, i) => (
          <BoardTableRow key={i}>
            <BoardTableColumn>{item.id}</BoardTableColumn>
            <BoardTableColumn title={item.title}>
              <Link to={`/postView/${item.id}`} className="board_link">
                <span className="board_item_title">{item.title}</span>
              </Link>
            </BoardTableColumn>
            <BoardTableColumn>{item.userId}</BoardTableColumn>
            {isMobile && (
              <BoardTableColumn>{formatDate(date, "MM-DD")}</BoardTableColumn>
            )}
            {isTablet && (
              <BoardTableColumn>{formatDate(date)}</BoardTableColumn>
            )}
            {isPc && <BoardTableColumn>{formatDate(date)}</BoardTableColumn>}
            {isTablet && <BoardTableColumn>{item.id}</BoardTableColumn>}
            {isPc && <BoardTableColumn>{item.id}</BoardTableColumn>}
            {isPc && (
              <BoardTableColumn>
                <button
                  type="button"
                  className="board_preview_btn"
                  onClick={() => handlePreviewBtn(item.id)}
                >
                  <span className="visually_hidden">미리보기</span>
                </button>
              </BoardTableColumn>
            )}
          </BoardTableRow>
        ))}
      </BoardTable>
      <BoardPagination
        total={posts.length}
        limit={detectMobile === true ? mobileLimit : limit}
        page={page}
        setPage={setPage}
      />
    </BoardWrap>
  );
};

export default BoardSecond;

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
