import React from "react";
import styled from "styled-components";

const TableRow = styled.tr`
  &:hover {
    background: ${(props) =>
      props.background ? "rgb(255, 239, 148)" : "#acacac"};
    cursor: pointer;
  }
`;

const BoardTableRow = ({ children, background }) => {
  return <TableRow background={background}>{children}</TableRow>;
};

export default BoardTableRow;
