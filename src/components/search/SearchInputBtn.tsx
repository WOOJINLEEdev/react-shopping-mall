import { useState, forwardRef, ChangeEvent, FormEvent } from "react";
import styled from "styled-components";
import { FaTimesCircle } from "@react-icons/all-files/fa/FaTimesCircle";

import { ISearchInputBtnProps } from "types";

const SearchInputBtn = forwardRef<HTMLInputElement, ISearchInputBtnProps>(
  (
    {
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
    const [search, setSearch] = useState<string>("");

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
      setSearch(e.currentTarget.value);

      if (handleSearchInputChange) {
        handleSearchInputChange(e);
      }
    };

    const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      handleSearchBtnClick(search);
    };

    return (
      <form className={searchClassName} onSubmit={handleFormSubmit}>
        <label htmlFor={searchInputId} className="visually_hidden">
          검색 입력창
        </label>
        <input
          type="text"
          name="search_input"
          id={searchInputId}
          className={searchInputClassName}
          placeholder={searchPlaceHolder ? searchPlaceHolder : "Search..."}
          value={search}
          onChange={handleSearchChange}
          ref={ref}
        />

        {handleRemoveBtnClick && search.trim().length > 0 ? (
          <RemoveBtn
            type="button"
            onClick={() => handleRemoveBtnClick(setSearch)}
          >
            <FaTimesCircle />
          </RemoveBtn>
        ) : (
          ""
        )}

        <button
          type="button"
          className={searchBtnClassName}
          onClick={() => handleSearchBtnClick(search)}
          aria-label="Search Button"
        />
      </form>
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
