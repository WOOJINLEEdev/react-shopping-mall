import React, { useState } from "react";

const SearchInputBtn = ({
  searchClassName,
  handleSearchBtn,
  handleSearchInput,
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
        className="board_search_input"
        value={searchInput}
        onChange={handleChange}
      />
      <button
        type="button"
        className="board_search_btn"
        onClick={handleSearchBtn}
      >
        <span className="visually_hidden">검색</span>
      </button>
    </div>
  );
};

export default SearchInputBtn;
