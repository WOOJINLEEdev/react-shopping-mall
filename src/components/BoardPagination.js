import React from "react";
import styled from "styled-components";

const BoardPagination = ({
  postsPerPage,
  totalPosts,
  currentPage,
  paginate,
}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <nav>
        <PageUl className="board_pagination">
          {pageNumbers.map((number) => (
            <PageLi
              key={number}
              active={number === currentPage}
              onClick={() => paginate(number)}
              className="page_item"
            >
              <PageSpan className="page_text">{number}</PageSpan>
            </PageLi>
          ))}
        </PageUl>
      </nav>
    </div>
  );
};

export default BoardPagination;

const PageUl = styled.ul`
  list-style: none;
  text-align: center;
  border-radius: 3px;
  color: white;
  padding: 20px 0;
  margin: 0 auto;
`;

const PageLi = styled.li`
  display: inline-block;
  font-size: 15px;
  font-weight: bold;
  padding: 5px;
  border-radius: 5px;
  width: 30px;
  color: #333;
  color: ${(props) => (props.active ? "red" : "#333")};
  &:hover {
    cursor: pointer;
    color: white;
    background-color: #263a6c;
  }
  &:focus::after {
    color: white;
    background-color: #263a6c;
  }
`;

const PageSpan = styled.span`
  &:hover::after,
  &:focus::after {
    border-radius: 100%;
    color: white;
    background-color: #263a6c;
  }
`;
