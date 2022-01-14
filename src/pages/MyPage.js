import React from "react";
import styled from "styled-components";
import MyPageChart from "components/mypage/MyPageChart";
import Loading from "components/common/Loading";
import useMyPageData from "hooks/useMyPageData";
import MyPageInfo from "components/mypage/MyPageInfo";
import MyPageInfoDetail from "components/mypage/MyPageInfoDetail";

const MyPage = () => {
  const { myData, loadingMyData, myDataError } = useMyPageData();

  if (loadingMyData) return <Loading />;
  if (myDataError) return <div>에러발생...</div>;

  return (
    <MyPageWrap className="main_wrap">
      <h2 className="main_title">마이페이지</h2>

      <MyInfoWrap>
        <MyPageInfo myData={myData} />
        <MyPageInfoDetail myData={myData} />
      </MyInfoWrap>

      <MyPageChartWrap>
        <ChartTitle>Chart</ChartTitle>
        <MyPageChart userName={myData.name} />
      </MyPageChartWrap>
    </MyPageWrap>
  );
};

export default MyPage;

const MyPageWrap = styled.div`
  width: calc(100% - 60px);
  min-height: calc(100vh - 271px);
  padding: 50px 30px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: calc(100% - 40px);
    padding: 30px 20px 60px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: calc(100% - 80px);
    padding: 40px;
  }
`;

const MyInfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 20px 0;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    flex-direction: column;
  }
`;

const MyPageChartWrap = styled.div`
  padding: 30px;
  background-color: #fff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  border: 2px solid #d4d4d4;
  box-shadow: 0 2px 5px 1px rgb(64 60 67 / 16%);

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    padding: 20px 10px;
  }
`;

const ChartTitle = styled.h3`
  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;
  }
`;
