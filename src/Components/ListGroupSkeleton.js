import React from "react";
import "../Components/ListGroupSkeleton.css";

const ListGroupSkeleton = () => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];
  return (
    <div className="skeleton_wrap">
      <ul className="skeleton_listgroup">
        {arr.map((item, i) => (
          <li key={i} className="skeleton_list">
            <div
              className="skeleton_list_img"
              style={{
                width: "300px",
                height: "300px",
                background: "#f2f2f2",
                borderRadius: "5px",
              }}
            ></div>
            <p
              className="skeleton_list_text"
              style={{
                margin: "5px 0",
                height: "26.8px",
                background: "#f2f2f2",
                borderRadius: "5px",
              }}
            ></p>
            <p
              className="skeleton_list_text"
              style={{
                margin: "5px 0",
                height: "26.8px",
                background: "#f2f2f2",
                borderRadius: "5px",
              }}
            ></p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListGroupSkeleton;
