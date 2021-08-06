import React from "react";

const BoardTable = ({ headersName, children, loading, boardLocal }) => {
  return (
    <>
      {loading && <div> loading... </div>}
      <table className="board_list">
        <colgroup>
          <col className="board_col th_num" />
          {boardLocal === "first" ? (
            <col className="board_col th_type" />
          ) : null}
          {/* <col className="board_col th_type" /> */}
          <col className="board_col th_title" />
          <col className="board_col th_user" />
          <col className="board_col th_date" />
          <col className="board_col th_count" />
          <col className="board_col th_preview" />
        </colgroup>
        <thead>
          <tr className="board_thead_tr">
            {headersName.map((item, i) => (
              <th className="board_table_head" key={i}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </>
  );
};

export default BoardTable;
