import React from "react";
import styled from "styled-components";
import { BoardPaginationProps, ButtonProps } from "types";

function BoardPagination({
  total,
  limit,
  page,
  setPage,
}: BoardPaginationProps) {
  const numPages = Math.ceil(total / limit);

  return (
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill(undefined)
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

export default React.memo(BoardPagination);

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

// interface ButtonProps {
//   disabled?: boolean;
//   ["aria-current"]?: any;
// }

const Button = styled.button<ButtonProps>`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: #fff;
  color: #333;
  font-size: 1rem;

  @media (hover: hover) {
    &:hover {
      color: green;
      cursor: pointer;
      transform: translateY(-2px);
    }
  }

  &[disabled] {
    background: #efefef;
    color: gray;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: green;
    color: #fff;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;
