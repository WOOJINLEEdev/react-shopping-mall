import styled from "styled-components";

interface QuantityCounterProps {
  quantity: number;
  onIncrement: (event: React.MouseEvent<HTMLInputElement>) => void;
  onDecrement: (event: React.MouseEvent<HTMLInputElement>) => void;
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
}: QuantityCounterProps) => {
  const handleQtyChange = () => {
    console.log(quantity);
  };

  return (
    <QuantityArea margin={margin}>
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
          onChange={handleQtyChange}
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

interface QuantityAreaProps {
  margin?: boolean;
  flexEnd?: boolean;
}

const QuantityArea = styled.div<QuantityAreaProps>`
  display: flex;
  margin: ${(props) => (props.margin ? "0 70px" : "0")};

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    justify-content: ${(props) => (props.flexEnd ? "flex-end" : "flex-start")};
    margin: 0;
  }
`;
