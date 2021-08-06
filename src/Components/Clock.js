import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 1024px;
  height: 30px;
  line-height: 30px;
  margin: 0 auto;
  text-align: center;
`;

const CurGroup = styled.div`
  display: flex;
  justify-content: space-between;
  width: 300px;
  line-height: 30px;
  margin: 0 auto;
`;

const CurDate = styled.div`
  font-size: 15px;
`;

const CurDay = styled.div`
  font-style: italic;
`;

const CurTime = styled.div`
  font-size: 15px;
  font-weight: bold;
`;

class Clock extends Component {
  state = {
    date: new Date(),
  };

  render() {
    const { date } = this.state;

    const getDayOfWeek = (day) => {
      switch (day) {
        case 0:
          return "일요일";
        case 1:
          return "월요일";
        case 2:
          return "화요일";
        case 3:
          return "수요일";
        case 4:
          return "목요일";
        case 5:
          return "금요일";
        case 6:
          return "토요일";
        default:
          throw new Error(`not supported day: ${day}`);
      }
    };

    return (
      <Container className="main_clock">
        <CurGroup>
          <CurDate>
            {date.getFullYear()}&nbsp;/&nbsp;
            {date.getMonth() < 9
              ? "0" + (date.getMonth() + 1)
              : date.getMonth() + 1}
            &nbsp;/&nbsp;
            {date.getDate() < 10 ? "0" + date.getDate() : date.getDate()}
          </CurDate>
          <CurDay>{getDayOfWeek(date.getDay())}</CurDay>
          <CurTime>
            {date.getHours() < 10 ? "0" + date.getHours() : date.getHours()}
            &nbsp;:&nbsp;
            {date.getMinutes() < 10
              ? "0" + date.getMinutes()
              : date.getMinutes()}
            &nbsp;:&nbsp;
            {date.getSeconds() < 10
              ? "0" + date.getSeconds()
              : date.getSeconds()}
          </CurTime>
        </CurGroup>
      </Container>
    );
  }
  getDate = () => {
    this.setState({
      date: new Date(),
    });
  };

  componentDidMount() {
    this.oneMinuteCall = setInterval(() => this.getDate(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.oneMinuteCall);
  }
}

export default Clock;
