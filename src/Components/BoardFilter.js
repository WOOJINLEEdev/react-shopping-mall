import React from "react";
import styled from "styled-components";

const FilterWrap = styled.div`
  width: 100px;
  margin-right: 20px;
`;

const BoardFilter = ({ handleSelectOption, selectedOption }) => {
  const boardType = ["공지사항", "일반"];
  return (
    <FilterWrap>
      <select
        className="board_filter"
        onChange={handleSelectOption}
        value={selectedOption}
      >
        <option value="">구분</option>
        {boardType.map((type) => (
          <option value={type}>{type}</option>
        ))}
      </select>
    </FilterWrap>
  );
};

export default BoardFilter;
