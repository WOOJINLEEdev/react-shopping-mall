import { BoardTableColumnProp } from "types";

const BoardTableColumn = ({ children, title }: BoardTableColumnProp) => {
  return (
    <td className="board_table_column" title={title}>
      {children}
    </td>
  );
};

export default BoardTableColumn;
