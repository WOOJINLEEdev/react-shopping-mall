import { Link } from "react-router-dom";
import styled from "styled-components";

const CartErrorMessage = () => {
  return (
    <DivContainer>
      로그인 후 이용해주세요!
      <Link to="/login" className="login_link">
        로그인
      </Link>
    </DivContainer>
  );
};

export default CartErrorMessage;

const DivContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right bottom, #efefef, #333);
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  width: 100%;
  height: 600px;
  align-items: center;
  text-align: center;
  line-height: 300px;
  font-size: 40px;
  font-weight: bold;
  margin: 0 auto;
  text-decoration: none;

  .login_link {
    height: 100px;
    margin: 0 auto;
    line-height: 20px;
    font-size: 20px;
    color: transparent;
    background: linear-gradient(to left bottom, #efefef, #333);
    background-clip: text;
    -webkit-background-clip: text;
    text-decoration: none;
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    font-size: 25px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    font-size: 30px;
  }
`;
