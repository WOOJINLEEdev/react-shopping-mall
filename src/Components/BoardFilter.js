import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </FilterWrap>
  );
};

export default BoardFilter;

BoardFilter.propTypes = {
  handleSelectOption: PropTypes.func,
  selectedOption: PropTypes.string,
};

const FilterWrap = styled.div`
  width: 100px;
  margin-right: 20px;
`;
