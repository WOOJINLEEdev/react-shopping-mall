import Loading from "components/common/Loading";
import { useDevice } from "hooks/useDevice";

interface BoardTableProps {
  headersName: any;
  children?: any;
  loading?: any;
  boardLocal?: any;
}

const BoardTable = ({
  headersName,
  children,
  loading,
  boardLocal,
}: BoardTableProps) => {
  const { isPc, isTablet, isMobile } = useDevice();

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
            {headersName.map((item: any, i: any) => (
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
