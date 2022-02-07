import React from "react";
import styled from "styled-components";

interface BoardTableRowProps {
  children?: any;
  background?: any;
}

const BoardTableRow = ({ children, background }: BoardTableRowProps) => {
  return <TableRow background={background}>{children}</TableRow>;
};

export default BoardTableRow;

interface TableRowProps {
  background?: string;
}

const TableRow = styled.tr<TableRowProps>`
  @media (hover: hover) {
    &:hover {
      background: ${(props) =>
        props.background ? "rgb(255, 239, 148)" : "#acacac"};
      cursor: pointer;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    border-bottom: 2px solid #fff;
    background-color: rgb(245, 245, 245);
  }
`;
