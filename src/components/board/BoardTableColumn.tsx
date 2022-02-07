interface BoardTableColumnProp {
  children?: any;
  title?: any;
}

const BoardTableColumn = ({ children, title }: BoardTableColumnProp) => {
  return (
    <td className="board_table_column" title={title}>
      {children}
    </td>
  );
};

export default BoardTableColumn;
