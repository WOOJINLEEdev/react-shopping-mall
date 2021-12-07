import React from "react";
import { ReactComponent as UpArrow } from "../images/up.svg";

const TopButton = ({ width, fill, height }) => {
  return (
    <div>
      <UpArrow fill={fill} width={width} height={height} />
    </div>
  );
};

export default TopButton;
