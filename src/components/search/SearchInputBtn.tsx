import { useState, useMemo, forwardRef } from "react";
import styled from "styled-components";
import useSearchResult from "hooks/useSearchResult";
import { debounce } from "lodash";
import { SearchInputBtnProps } from "types";
import { FaTimesCircle } from "@react-icons/all-files/fa/FaTimesCircle";

const SearchInputBtn = forwardRef<HTMLInputElement, SearchInputBtnProps>(
  (
    {
      show,
      searchClassName,
      handleSearchBtnClick,
      handleSearchInputChange,
      searchInputClassName,
      searchBtnClassName,
      searchPlaceHolder,
      searchInputId,
      handleRemoveBtnClick,
    },
    ref
  ) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const { searchResultMutate } = useSearchResult();

    const debouncedSearchResultMutate = useMemo(
      () => debounce(searchResultMutate, 1000),
      []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);

      if (show) {
        debouncedSearchResultMutate(e.target.value);
      }

      if (handleSearchInputChange) {
        handleSearchInputChange(e);
      }
    };

    const onCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearchBtnClick(searchInput);
      }
    };

    return (
      <div className={searchClassName}>
        <label htmlFor={searchInputId} className="visually_hidden">
          검색 입력창
        </label>
        <input
          type="text"
          id={searchInputId}
          name="search_input"
          placeholder={searchPlaceHolder ? searchPlaceHolder : "Search..."}
          className={searchInputClassName}
          value={searchInput}
          onChange={handleChange}
          onKeyPress={onCheckEnter}
          ref={ref}
        />

        {handleRemoveBtnClick && searchInput.trim().length > 0 ? (
          <RemoveBtn
            type="button"
            onClick={() => handleRemoveBtnClick(setSearchInput)}
          >
            <FaTimesCircle />
          </RemoveBtn>
        ) : (
          ""
        )}

        <button
          type="button"
          className={searchBtnClassName}
          onClick={() => handleSearchBtnClick(searchInput)}
        >
          <span className="visually_hidden">검색</span>
        </button>
      </div>
    );
  }
);

export default SearchInputBtn;

const RemoveBtn = styled.button`
  position: absolute;
  right: 50px;
  padding: 10px;
  border: 0;
  background: transparent;
  cursor: pointer;

  & svg {
    display: block;
    width: 20px;
    height: 20px;
    padding: 20px 10px;
  }

  @media only screen and (max-width: 1023px) {
    padding: 0;
    right: 20%;

    & svg {
      width: 14px;
      height: 14px;
      padding: 18px 10px;
    }
  }
`;
