import React from "react";

const BoardTableColumn = ({ children, title }) => {
  return (
    <td className="board_table_column" title={title}>
      {children}
    </td>
  );
};

export default BoardTableColumn;
