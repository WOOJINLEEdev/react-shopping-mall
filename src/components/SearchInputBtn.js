import React, { useState, useMemo, forwardRef } from "react";
import useSearchResult from "../hooks/useSearchResult";
import { debounce } from "lodash";

const SearchInputBtn = (
  {
    show,
    searchClassName,
    handleSearchBtn,
    handleSearchInput,
    SearchInputClassName,
    SearchBtnClassName,
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

  const handleChange = (e) => {
    setSearchInput(e.target.value);

    if (show) {
      debouncedSearchResultMutate(e.target.value);
    }

    if (handleSearchInput) {
      handleSearchInput(e);
    }
  };

  const onCheckEnter = (e) => {
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
        className={SearchInputClassName}
        value={searchInput}
        onChange={handleChange}
        onKeyPress={onCheckEnter}
        ref={ref}
      />

      <button
        type="button"
        className={SearchBtnClassName}
        onClick={() => handleSearchBtn(searchInput)}
      >
        <span className="visually_hidden">검색</span>
      </button>
    </div>
  );
};

export default forwardRef(SearchInputBtn);
