import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { CgClose } from "react-icons/cg";

import SearchWrap from "components/search/SearchWrap";

import { searchWrapState } from "state";
import { IDimmedLayer } from "types";

const SearchModal = () => {
  const [searchClassName, setSearchClassName] = useState<string>(
    "header_search_style",
  );
  const [searchInputClassName, setSearchInputClassName] = useState<string>(
    "header_search_input",
  );
  const [searchBtnClassName, setSearchBtnClassName] =
    useState<string>("header_search_btn");

  const [searchWrapStatus, setSearchWrapStatus] =
    useRecoilState<boolean>(searchWrapState);

  const handleDimCloseBtnClick = () => {
    setSearchWrapStatus(false);
  };

  return (
    <DimmedLayer show={searchWrapStatus}>
      <button
        type="button"
        className="btn_dim_close"
        onClick={handleDimCloseBtnClick}
        aria-label="Close Button"
      >
        <CgClose />
      </button>
      <SearchWrap
        show={searchWrapStatus}
        searchClassName={searchClassName}
        searchInputClassName={searchInputClassName}
        searchBtnClassName={searchBtnClassName}
      />
    </DimmedLayer>
  );
};

export default SearchModal;

const DimmedLayer = styled.div<IDimmedLayer>`
  display: ${(props) => (props.show ? "block" : "none")};
  position: fixed;
  width: 100%;
  max-width: 1024px;
  height: 100%;
  top: 0;
  padding-top: 120px;
  background: rgba(255, 255, 255, 0.9);
  text-align: right;
  z-index: 99;

  .btn_dim_close {
    width: 100px;
    height: 100px;
    padding: 0;
    border: 0;
    background: transparent;
    cursor: pointer;
    margin-right: 100px;

    & svg {
      min-width: 100%;
      min-height: 100%;
    }
  }
`;
