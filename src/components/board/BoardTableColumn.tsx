import { ReactNode } from "react";

interface IBoardTableColumnProps {
  children?: ReactNode;
  title?: string;
}

const BoardTableColumn = ({ children, title }: IBoardTableColumnProps) => {
  return (
    <td className="board_table_column" title={title}>
      {children}
    </td>
  );
};

export default BoardTableColumn;
