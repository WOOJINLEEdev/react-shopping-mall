interface IOrderItemInfoHeadQtyProps {
  sum: number;
}

const OrderItemInfoHeadQty = ({ sum }: IOrderItemInfoHeadQtyProps) => {
  return (
    <div className="info_head_quantity">
      <span className="total_quantity_text">
        총 수량 <em className="item_total_quantity">{sum}</em>개
      </span>
    </div>
  );
};

export default OrderItemInfoHeadQty;
