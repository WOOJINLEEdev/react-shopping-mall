import {
  useState,
  useEffect,
  lazy,
  Suspense,
  useCallback,
  ChangeEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
import { GiSpeaker } from "@react-icons/all-files/gi/GiSpeaker";

import useDevice from "hooks/useDevice";

import BoardTable from "components/board/BoardTable";
import BoardTableRow from "components/board/BoardTableRow";
import BoardTableColumn from "components/board/BoardTableColumn";
import BoardPagination from "components/board/BoardPagination";
import BoardFilter from "components/board/BoardFilter";
import SearchInputBtn from "components/search/SearchInputBtn";
import Loading from "components/common/Loading";
import { postList, sortedPostList } from "components/board/board-first-data";
import { IFirstPostItem } from "components/board/types";

import { curBoardState } from "state";
import { tokenState } from "App";

Modal.setAppElement("#root");

const headersName = [
  "번호",
  "구분",
  "제목",
  "작성자",
  "등록일",
  "조회수",
  "미리보기",
];

const BoardFirstModal = lazy(() => import("components/board/BoardFirstModal"));

const BoardFirst = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const [pageState, setPageState] = useRecoilState(curBoardState("first"));

  const [dataList, setDataList] = useState<IFirstPostItem[]>([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(pageState.pageNumber);
  const [selectedPreviewId, setSelectedPreviewId] = useState(1);
  const offset = (page - 1) * limit;

  const [searchClassName, setSearchClassName] = useState("search_wrap");
  const [searchInputClassName, setsearchInputClassName] =
    useState("board_search_input");
  const [searchBtnClassName, setsearchBtnClassName] =
    useState("board_search_btn");
  const [selectedOption, setSelectedOption] = useState("");

  const token = useRecoilValue(tokenState);
  const { isPc, isTablet, isMobile } = useDevice();

  const notice = postList.filter((data) => data.type === "공지사항");
  let searchInput = "";

  useEffect(() => {
    setDataList(sortedPostList);
    localStorage.setItem("board", "first");
  }, []);

  useEffect(() => {
    setPageState({ ...pageState, pageNumber: page });
  }, [page]);

  const handleWriteBtnClick = useCallback(() => {
    if (token) {
      navigate("/boardPost");
    } else {
      alert("로그인 후 이용해주세요!");
      return false;
    }
  }, [navigate, token]);

  const handlePreviewBtnClick = useCallback((itemId: number) => {
    setSelectedPreviewId(itemId);
    setIsOpen(true);
  }, []);

  const onRequestClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelectOption = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      if (e.target.value === "공지사항") {
        setSelectedOption("공지사항");

        let list = dataList.length !== 12 ? sortedPostList : dataList;
        let noticeList = list.filter((data) => data.type === "공지사항");
        return setDataList(noticeList);
      }

      if (e.target.value === "일반") {
        setSelectedOption("일반");

        let list = dataList.length < 12 ? sortedPostList : dataList;
        let noticeList = list.filter((data) => data.type === "일반");
        return setDataList(noticeList);
      }

      setSelectedOption("");
      setDataList(sortedPostList);
    },
    [selectedOption, dataList],
  );

  const handleSearchBtnClick = () => {
    const searchFilter = dataList.filter((item: IFirstPostItem) =>
      item.title.includes(searchInput),
    );
    setDataList(searchFilter);
  };

  const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetValue = e.currentTarget.value;
    searchInput = targetValue;
  };

  const getHeadersName = useCallback(() => {
    if (isTablet) {
      return ["번호", "구분", "제목", "작성자", "등록일", "조회수"];
    }
    if (isMobile) {
      return ["구분", "제목", "작성자", "등록일"];
    }

    return headersName;
  }, [isTablet, isMobile]);

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
        <BoardFirstModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          postList={postList}
          boardItemNo={selectedPreviewId}
        />
      </Suspense>

      <BoardTable headersName={getHeadersName()} boardLocal="first">
        {notice.map((item) => (
          <BoardTableRow key={item.no}>
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
              <Link to={`/boardFirst/posts/${item.no}`} className="board_link">
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
                  onClick={() => handlePreviewBtnClick(item.no)}
                  aria-label="미리보기"
                />
              </BoardTableColumn>
            )}
          </BoardTableRow>
        ))}
        {dataList
          .slice(offset, offset + limit)
          .map((item: IFirstPostItem, i: number) => (
            <BoardTableRow key={`board_first_table_row${i}`}>
              {isTablet && <BoardTableColumn>{item.no}</BoardTableColumn>}
              {isPc && <BoardTableColumn>{item.no}</BoardTableColumn>}
              <BoardTableColumn>{item.type}</BoardTableColumn>
              <BoardTableColumn>
                <Link
                  to={`/boardFirst/posts/${item.no}`}
                  className="board_link"
                >
                  {item.title}
                </Link>
              </BoardTableColumn>
              <BoardTableColumn>{item.user}</BoardTableColumn>
              {isMobile && (
                <BoardTableColumn>
                  {item.createDate.substring(5)}
                </BoardTableColumn>
              )}
              {isTablet && (
                <BoardTableColumn>{item.createDate}</BoardTableColumn>
              )}
              {isTablet && (
                <BoardTableColumn>{item.readCount}</BoardTableColumn>
              )}
              {isPc && <BoardTableColumn>{item.createDate}</BoardTableColumn>}
              {isPc && <BoardTableColumn>{item.readCount}</BoardTableColumn>}
              {isPc && (
                <BoardTableColumn>
                  <button
                    type="button"
                    className="board_preview_btn"
                    onClick={() => handlePreviewBtnClick(item.no)}
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
