import { useState } from "react";
import styled from "styled-components";

import { formatDate, getDayOfWeek } from "utils/date";

import CurTime from "components/home/CurTime";

const Clock = () => {
  const [date, setDate] = useState(new Date());
  const curDate = formatDate(date).replaceAll("-", ". ");
  const curDay = getDayOfWeek(date.getDay());

  return (
    <Container className="main_clock">
      <CurGroup className="clock_group">
        <CurDate>{curDate}</CurDate>
        <CurDay>{curDay}</CurDay>
        <CurTime />
      </CurGroup>
    </Container>
  );
};

export default Clock;

const Container = styled.div`
  width: 1024px;
  height: 30px;
  line-height: 30px;
  margin: 10px auto;
  text-align: center;
  user-select: none;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    margin: 0;
    height: 35px;
    line-height: 35px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    margin: 0;
    height: 40px;
    line-height: 40px;
  }
`;

const CurGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  line-height: 30px;
  margin: 0 auto;
  font-size: 15px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    justify-content: space-evenly;
    margin: 0 auto;
    line-height: 35px;
    font-size: 13px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    margin: 0 auto;
    line-height: 40px;
  }
`;

const CurDate = styled.div``;

const CurDay = styled.div``;
