import React from "react";
import styled, { css } from "styled-components";

const QuantityCounter = ({
  quantity,
  onIncrement,
  onDecrement,
  margin,
  flexEnd,
}) => {
  const QuantityArea = styled.div`
    display: flex;
    margin: ${(props) => (props.margin ? "0 70px" : "0")};

    @media only screen and (min-width: 320px) and (max-width: 767px) {
      justify-content: ${(props) =>
        props.flexEnd ? "flex-end" : "flex-start"};
      margin: 0;
    }
  `;

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
      <input
        type="text"
        name="itemQty"
        className="item_quantity"
        value={quantity}
      />
      <input
        type="button"
        className="qty plus"
        value="+"
        name="count"
        onClick={onIncrement}
        disabled={quantity === 5}
      />
    </QuantityArea>
  );
};

export default QuantityCounter;
