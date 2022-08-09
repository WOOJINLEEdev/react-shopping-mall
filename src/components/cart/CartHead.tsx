import { IAddedCartItem } from "components/cart/types";

interface ICartHeadProps {
  items: IAddedCartItem[];
  allChecked: boolean;
  handleAllCheckChange: () => void;
  handleChoiceItemRemoveBtnClick: () => Promise<void>;
}

const CartHead = ({
  items,
  allChecked,
  handleAllCheckChange,
  handleChoiceItemRemoveBtnClick,
}: ICartHeadProps) => {
  return (
    <div className="info_title">
      <h2 className="info_head orderInfo">
        ■ 주문상품 정보 / 총 <span className="total">{items.length}</span>개
      </h2>
      <div className="info_allCheck">
        <div className="allCheck_wrap">
          <input
            type="checkbox"
            name="allCheck"
            id="allCheck"
            className="check_all"
            onChange={handleAllCheckChange}
            checked={allChecked}
          />
          <label htmlFor="allCheck" className="allCheck_text">
            전체 선택
          </label>
        </div>
        <input
          type="button"
          className="choice_item_remove_btn"
          value="선택 삭제"
          onClick={handleChoiceItemRemoveBtnClick}
        />
      </div>
    </div>
  );
};

export default CartHead;
