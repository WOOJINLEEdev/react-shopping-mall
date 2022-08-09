import { ReactNode } from "react";
import styled from "styled-components";

interface IBoardTableRowProps {
  children?: ReactNode;
  background?: string;
}

const BoardTableRow = ({ children, background }: IBoardTableRowProps) => {
  return <TableRow background={background}>{children}</TableRow>;
};

export default BoardTableRow;

interface ITableRowProps {
  background?: string;
}

const TableRow = styled.tr<ITableRowProps>`
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
