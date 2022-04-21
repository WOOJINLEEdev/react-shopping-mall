import { useState, useEffect, lazy, Suspense, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";
import Modal from "react-modal";
import BoardTable from "components/board/BoardTable";
import BoardTableRow from "components/board/BoardTableRow";
import BoardTableColumn from "components/board/BoardTableColumn";
import BoardPagination from "components/board/BoardPagination";
import Loading from "components/common/Loading";
import SearchInputBtn from "components/search/SearchInputBtn";
import useCurrentBoardPage from "hooks/useCurrentBoardPage";
import { useDevice } from "hooks/useDevice";
import { getToken } from "utils/token";
import { formatDate } from "utils/format-date";

Modal.setAppElement("#root");

const BoardItemModal = lazy(() => import("components/board/BoardItemModal"));

const headersName = ["번호", "제목", "작성자", "등록일", "조회수", "미리보기"];

interface PostType {
  body: string;
  id: number;
  title: string;
  userId: number;
}

const BOARD_SECOND_POSTS_CACHE: PostType[] = [];
const initPostsCache = (posts: PostType[]) => {
  posts.forEach((post: PostType) => {
    BOARD_SECOND_POSTS_CACHE.push(post);
  });
};

const existPostsCache = () => {
  return BOARD_SECOND_POSTS_CACHE.length > 0;
};

const getPostsCache = () => {
  return BOARD_SECOND_POSTS_CACHE;
};

const BoardSecond = () => {
  const navigate = useNavigate();

  const { currentBoardPageData, getCurrentBoardPage, mutateCurrentBoardPage } =
    useCurrentBoardPage();

  const detectMobile = detectMobileDevice();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const initialPage = getCurrentBoardPage("second");
  const [selectedPreviewId, setSelectedPreviewId] = useState<number>(1);
  const [posts, setPosts] = useState<PostType[]>(getPostsCache());
  const [limit, setLimit] = useState<number>(10);
  const [mobileLimit, setMobileLimit] = useState<number>(20);
  const [page, setPage] = useState<number>(initialPage);
  const offset =
    detectMobile === true ? (page - 1) * mobileLimit : (page - 1) * limit;
  const offsetLimit =
    detectMobile === true ? offset + mobileLimit : offset + limit;

  const [searchClassName, setSearchClassName] = useState<string>("search_wrap");
  const [searchInputClassName, setsearchInputClassName] =
    useState<string>("board_search_input");
  const [searchBtnClassName, setsearchBtnClassName] =
    useState<string>("board_search_btn");

  const token = getToken();
  const date = new Date();
  let searchInput = "";

  const { isPc, isTablet, isMobile } = useDevice();

  useEffect(() => {
    detectMobileDevice();

    if (existPostsCache()) {
      return;
    }

    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => {
        const reverseData = res.data.reverse();
        setPosts(reverseData);
        initPostsCache(reverseData);
      })
      .then((err) => console.log(err));

    localStorage.setItem("board", "second");
  }, []);

  useEffect(() => {
    mutateCurrentBoardPage("second", page);
  }, [page]);

  function detectMobileDevice() {
    const minWidth = 500;

    return window.innerWidth <= minWidth;
  }

  const handleWriteBtnClick = useCallback(() => {
    if (token) {
      navigate("/boardPost");
    } else {
      alert("로그인 후 이용해주세요!");
      return false;
    }
  }, [token]);

  const handlePreviewBtnClick = useCallback(
    (itemId: number) => {
      setSelectedPreviewId(itemId);
      setIsOpen(true);
    },
    [selectedPreviewId, isOpen]
  );

  const onRequestClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.target.value;
    searchInput = targetValue;
  };

  const handleSearchBtnClick = () => {
    const searchFilter = posts.filter((item) =>
      item.title.includes(searchInput)
    );
    console.log(searchFilter);
  };

  const getHeadersName = useCallback(() => {
    if (isTablet) {
      return ["번호", "제목", "작성자", "등록일", "조회수"];
    }
    if (isMobile) {
      return ["번호", "제목", "작성자", "등록일"];
    }

    return headersName;
  }, [isTablet, isMobile]);

  return (
    <BoardWrap>
      <h2 className="board_second_head">
        커뮤니티 (Board {localStorage.getItem("board")})
      </h2>
      <div className="board_write_wrap">
        <SearchInputBtn
          searchClassName={searchClassName}
          searchInputClassName={searchInputClassName}
          searchBtnClassName={searchBtnClassName}
          handleSearchBtnClick={handleSearchBtnClick}
          handleSearchInputChange={handleSearchInputChange}
        />
        <button
          type="button"
          className="board_write_btn"
          onClick={handleWriteBtnClick}
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
                  onClick={() => handlePreviewBtnClick(item.id)}
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
