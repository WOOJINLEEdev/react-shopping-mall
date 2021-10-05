import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import useSearchResult from "../Hooks/useSearchResult";

const SearchInputBtn = ({
  searchClassName,
  handleSearchBtn,
  handleSearchInput,
  SearchInputClassName,
  SearchBtnClassName,
  show,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const { searchResultData, searchResultMutate } = useSearchResult();

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    searchResultMutate(e.target.value);

    if (handleSearchInput) {
      handleSearchInput(e);
    }
  };

  const onCheckEnter = (e) => {
    if (e.key === "Enter") {
      handleSearchBtn();
    }
  };

  console.log(searchResultData);

  return (
    <div className={searchClassName}>
      <input
        type="text"
        name="search_input"
        placeholder="Search..."
        className={SearchInputClassName}
        value={searchInput}
        onChange={handleChange}
        onKeyPress={onCheckEnter}
      />
      <button
        type="button"
        className={SearchBtnClassName}
        onClick={handleSearchBtn}
      >
        <span className="visually_hidden">검색</span>
      </button>
    </div>
  );
};

export default withRouter(SearchInputBtn);
