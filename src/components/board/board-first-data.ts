import { IFirstPostItem } from "components/board/types";

export const postList = [
  {
    no: 1,
    type: "공지사항",
    title: "첫 번째 게시글입니다.",
    content: "첫 번째 게시글 내용입니다.",
    user: "관리자",
    createDate: "2021-01-25",
    readCount: 276,
  },
  {
    no: 2,
    type: "공지사항",
    title: "두 번째 게시글입니다.",
    content: "두 번째 게시글 내용입니다.",
    user: "관리자",
    createDate: "2021-02-25",
    readCount: 115,
  },
  {
    no: 3,
    type: "공지사항",
    title: "세 번째 게시글입니다.",
    content: "세 번째 게시글 내용입니다.",
    user: "관리자",
    createDate: "2021-03-29",
    readCount: 1,
  },
  {
    no: 4,
    type: "일반",
    title: "네 번째 게시글입니다.",
    content: "네 번째 게시글 내용입니다.",
    user: "김철수",
    createDate: "2021-04-25",
    readCount: 92,
  },
  {
    no: 5,
    type: "일반",
    title: "다섯 번째 게시글입니다.",
    content: "다섯 번째 게시글 내용입니다.",
    user: "별주부",
    createDate: "2021-05-25",
    readCount: 64,
  },
  {
    no: 6,
    type: "일반",
    title: "여섯 번째 게시글입니다.",
    content: "여섯 번째 게시글 내용입니다.",
    user: "김수한무",
    createDate: "2021-06-25",
    readCount: 16,
  },
  {
    no: 7,
    type: "일반",
    title: "일곱 번째 게시글입니다.",
    content: "두번째 게시글 내용입니다.",
    user: "조진웅",
    createDate: "2021-07-02",
    readCount: 25,
  },
  {
    no: 8,
    type: "일반",
    title: "여덟 번째 게시글입니다.",
    content: "여덟 번째 게시글 내용입니다.",
    user: "김영희",
    createDate: "2021-08-25",
    readCount: 51,
  },
  {
    no: 9,
    type: "일반",
    title: "아홉 번째 게시글입니다.",
    content: "아홉 번째 게시글입니다.",
    user: "김철수",
    createDate: "2021-09-26",
    readCount: 25,
  },
  {
    no: 10,
    type: "일반",
    title: "열 번째 게시글입니다.",
    content: "열 번째 게시글입니다.",
    user: "별주부",
    createDate: "2021-10-25",
    readCount: 4,
  },
  {
    no: 11,
    type: "일반",
    title: "열한 번째 게시글입니다.",
    content: "두번째 게시글 내용입니다.",
    user: "김진아",
    createDate: "2021-11-30",
    readCount: 20,
  },
  {
    no: 12,
    type: "일반",
    title: "열두 번째 게시글입니다.",
    content: "두번째 게시글 내용입니다.",
    user: "김하늘",
    createDate: "2021-12-02",
    readCount: 25,
  },
];

const sortPostList = (posts: IFirstPostItem[]) => {
  return [...posts].sort((a, b) => {
    if (a.no < b.no) {
      return 1;
    }
    if (a.no > b.no) {
      return -1;
    }
    return 0;
  });
};

export const sortedPostList = sortPostList(postList);
