import React from "react";
import { useMediaQuery } from "react-responsive";
import Loading from "components/common/Loading";

const BoardTable = ({ headersName, children, loading, boardLocal }) => {
  const isPc = useMediaQuery({ query: "(min-width:1024px)" });
  const isTablet = useMediaQuery({
    query: "(min-width:768px) and (max-width:1023px)",
  });
  const isMobile = useMediaQuery({
    query: "(min-width: 320px) and (max-width:767px)",
  });

  return (
    <>
      {loading && <Loading />}
      <table className="board_list">
        <colgroup>
          {boardLocal === "second"
            ? isMobile && <col className="board_col th_num" />
            : null}
          {isTablet && <col className="board_col th_num" />}
          {isPc && <col className="board_col th_num" />}
          {boardLocal === "first" ? (
            <col className="board_col th_type" />
          ) : null}
          <col className="board_col th_title" />
          <col className="board_col th_user" />
          <col className="board_col th_date" />
          {isTablet && <col className="board_col th_count" />}
          {isPc && <col className="board_col th_count" />}
          {isPc && <col className="board_col th_preview" />}
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
