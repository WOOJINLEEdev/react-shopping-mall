import styled from "styled-components";

import { BoardFilterProps } from "types";

const BoardFilter = ({
  handleSelectOption,
  selectedOption,
}: BoardFilterProps) => {
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

const FilterWrap = styled.div`
  width: 100px;
  margin-right: 20px;
`;
