import { MouseEvent } from "react";
import styled from "styled-components";

interface IQuantityCounterProps {
  quantity: number;
  onIncrement: (event: MouseEvent<HTMLInputElement>) => void;
  onDecrement: (event: MouseEvent<HTMLInputElement>) => void;
  margin?: boolean;
  flexEnd?: boolean;
  productId?: number;
}

const QuantityCounter = ({
  quantity,
  onIncrement,
  onDecrement,
  margin,
  flexEnd,
  productId,
}: IQuantityCounterProps) => {
  return (
    <QuantityArea margin={margin} flexEnd={flexEnd}>
      <input
        type="button"
        className="qty minus"
        value="-"
        name="count"
        onClick={onDecrement}
        disabled={quantity === 1}
      />
      <>
        <input
          type="text"
          name="itemQty"
          id={`itemQty${productId}`}
          className="item_quantity"
          value={quantity}
          readOnly
        />
        <label htmlFor={`itemQty${productId}`} className="visually_hidden">
          수량
        </label>
      </>
      <input
        type="button"
        className="qty plus"
        value="+"
        name="count"
        onClick={onIncrement}
        disabled={quantity === 8}
      />
    </QuantityArea>
  );
};

export default QuantityCounter;

interface IQuantityAreaProps {
  margin?: boolean;
  flexEnd?: boolean;
}

const QuantityArea = styled.div<IQuantityAreaProps>`
  display: flex;
  margin: ${(props) => (props.margin ? "0 70px" : "0")};

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    justify-content: ${(props) => (props.flexEnd ? "flex-end" : "flex-start")};
    margin: 0;
  }
`;
