import { useEffect, useState } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";

const TopBtn = () => {
  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollY);

    return () => {
      window.removeEventListener("scroll", handleScrollY);
    };
  }, []);

  function handleScrollY() {
    if (window.scrollY > 299) {
      setScrollY(true);
    } else {
      setScrollY(false);
    }
  }

  const handleTopBtnClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <TopButton
      type="button"
      className={scrollY ? "tob_btn" : "opacity"}
      onClick={handleTopBtnClick}
      aria-label="Top Button"
    >
      <IoIosArrowUp />
    </TopButton>
  );
};

export default TopBtn;

const TopButton = styled.button`
  position: fixed;
  right: 2%;
  bottom: 100px;
  z-index: 100;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  padding: 0;
  color: #333333;
  cursor: pointer;
  background: #ffffff;
  border: 1px solid #d4d4d4;
  border-radius: 50%;
  box-shadow: 3px 3px 15px 3px rgba(0, 0, 0, 20%);
  opacity: 1;
  transition: opacity 0.5s;

  svg {
    width: 25px;
    height: 25px;
  }

  &.opacity {
    cursor: auto;
    background-color: #efefef;
    opacity: 0;
    transition: opacity 0.5s;
  }

  @media (hover: hover) {
    &:hover {
      background-color: #efefef;
    }

    &:hover > svg {
      fill: #333333;
    }
  }

  @media only screen and (min-width: 320px) and (max-width: 1023px) {
    width: 36px;
    height: 36px;
    bottom: 100px;

    svg {
      width: 16px;
      height: 16px;
      margin: 10px 0;
    }
  }
`;
