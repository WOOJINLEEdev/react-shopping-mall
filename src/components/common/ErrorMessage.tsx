import styled from "styled-components";

const ErrorMessage = () => {
  return (
    <DivContainer>
      <p>에러가 발생하여 데이터를 불러오지 못하였습니다.</p>
      <p>잠시 후 다시 시도하시거나 접속 부탁드립니다.</p>
    </DivContainer>
  );
};

export default ErrorMessage;

const DivContainer = styled.div`
  width: 100%;
  padding: 100px 0;
  color: #ff0000;
  font-size: 18px;
  text-align: center;

  p {
    padding: 10px 0;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 13px;

    p {
      width: 320px;
      margin: 0 auto;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 16px;

    p {
      width: 768px;
      margin: 0 auto;
    }
  }
`;
