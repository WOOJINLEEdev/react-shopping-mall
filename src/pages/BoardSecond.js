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
import useBoard from "hooks/useBoard";
import Loading from "components/common/Loading";
import SearchInputBtn from "components/search/SearchInputBtn";
import { getToken } from "utils/token";

Modal.setAppElement("#root");

const BoardItemModal = lazy(() => import("components/board/BoardItemModal"));

const BoardSecond = () => {
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [selectedPreviewId, setSelectedPreviewId] = useState(1);
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
    const searchFilter = board.filter((item) =>
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
        {currentPosts(board).map((item, i) => (
          <BoardTableRow key={i}>
            <BoardTableColumn>{item.id}</BoardTableColumn>
            <BoardTableColumn>
              <Link to={`/postView/${item.id}`} className="board_link">
                <span className="board_item_title">{item.title}</span>
              </Link>
            </BoardTableColumn>
            <BoardTableColumn>{item.userId}</BoardTableColumn>
            {isMobile && (
              <BoardTableColumn>
                {date.getMonth() < 9
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1}
                -{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
              </BoardTableColumn>
            )}
            {isTablet && (
              <BoardTableColumn>
                {date.getFullYear()}-
                {date.getMonth() < 9
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1}
                -{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
              </BoardTableColumn>
            )}
            {isPc && (
              <BoardTableColumn>
                {date.getFullYear()}-
                {date.getMonth() < 9
                  ? "0" + (date.getMonth() + 1)
                  : date.getMonth() + 1}
                -{date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
              </BoardTableColumn>
            )}
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
        postsPerPage={postsPerPage}
        totalPosts={board.length}
        currentPage={currentPage}
        paginate={setCurrentPage}
      ></BoardPagination>
    </BoardWrap>
  );
};

export default BoardSecond;

const BoardWrap = styled.div`
  width: 984px;
  height: 100vh;
  margin: 0 auto;
  padding: 50px 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 40px);
    height: 100%;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 40px);
    height: 100%;
  }
`;
