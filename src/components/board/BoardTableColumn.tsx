import { IBoardTableColumnProp } from "types";

const BoardTableColumn = ({ children, title }: IBoardTableColumnProp) => {
  return (
    <td className="board_table_column" title={title}>
      {children}
    </td>
  );
};

export default BoardTableColumn;
