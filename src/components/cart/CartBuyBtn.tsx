import styled from "styled-components";

interface ICartBuyBtnProps {
  handleBuyBtnClick: () => Promise<void>;
  disabled?: boolean;
}

const CartBuyBtn = ({ handleBuyBtnClick, disabled }: ICartBuyBtnProps) => {
  return (
    <Button type="button" onClick={handleBuyBtnClick} disabled={disabled}>
      BUY NOW
    </Button>
  );
};

export default CartBuyBtn;

const Button = styled.button`
  width: 100%;
  height: 70px;
  margin-top: 70px;
  font-size: 18px;
  color: #ffffff;
  background: ${(props) => (props.disabled ? "rgb(230, 230, 230)" : "#333333")};
  border: none;
  border-radius: 5px;
  cursor: pointer;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    margin-top: 40px;
  }
`;
