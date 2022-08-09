import { ChangeEvent } from "react";
import styled from "styled-components";

interface IBoardFilterProps {
  handleSelectOption: (e: ChangeEvent<HTMLSelectElement>) => void;
  selectedOption: string;
}

const BoardFilter = ({
  handleSelectOption,
  selectedOption,
}: IBoardFilterProps) => {
  const boardTypes = ["공지사항", "일반"];

  return (
    <FilterWrap>
      <select
        className="board_filter"
        onChange={handleSelectOption}
        value={selectedOption}
      >
        <option value="">구분</option>
        {boardTypes.map((type) => (
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
