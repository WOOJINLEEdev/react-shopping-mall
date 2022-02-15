import { useState, useMemo, forwardRef } from "react";
import useSearchResult from "hooks/useSearchResult";
import { debounce } from "lodash";

interface SearchInputBtnProps {
  show?: any;
  searchClassName?: string;
  handleSearchBtn: Function;
  handleSearchInput?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchInputClassName?: string;
  searchBtnClassName?: string;
  searchPlaceHolder?: string;
  searchInputId?: string;
}

const SearchInputBtn = forwardRef<HTMLInputElement, SearchInputBtnProps>(
  (
    {
      show,
      searchClassName,
      handleSearchBtn,
      handleSearchInput,
      searchInputClassName,
      searchBtnClassName,
      searchPlaceHolder,
      searchInputId,
    },
    ref
  ) => {
    const [searchInput, setSearchInput] = useState("");

    const { searchResultData, searchResultMutate } = useSearchResult();

    const debouncedSearchResultMutate = useMemo(
      () => debounce(searchResultMutate, 1000),
      []
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchInput(e.target.value);

      if (show) {
        debouncedSearchResultMutate(e.target.value);
      }

      if (handleSearchInput) {
        handleSearchInput(e);
      }
    };

    const onCheckEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSearchBtn(searchInput);
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

        <button
          type="button"
          className={searchBtnClassName}
          onClick={() => handleSearchBtn(searchInput)}
        >
          <span className="visually_hidden">검색</span>
        </button>
      </div>
    );
  }
);

export default SearchInputBtn;
