import React, { useState } from "react";
import { withRouter } from "react-router";

const SearchInputBtn = ({
  searchClassName,
  handleSearchBtn,
  handleSearchInput,
  SearchInputClassName,
  SearchBtnClassName,
  show,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    handleSearchInput(e);
  };

  return (
    <div className={searchClassName}>
      <input
        type="text"
        name="search_input"
        placeholder="Search..."
        className={SearchInputClassName}
        value={searchInput}
        onChange={handleChange}
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
