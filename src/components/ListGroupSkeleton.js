import React from "react";
import "../components/ListGroupSkeleton.css";

const ListGroupSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="skeleton_wrap">
      <ul className="skeleton_listgroup">
        {arr.map((item, i) => (
          <li key={i} className="skeleton_list">
            <div className="skeleton_list_img"></div>
            <p className="skeleton_list_text"></p>
            <p className="skeleton_list_text"></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroupSkeleton;
