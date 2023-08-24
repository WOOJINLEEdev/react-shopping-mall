import { Link } from "react-router-dom";

import { getSizedImageUrl } from "utils/image";
import { formatPrice } from "utils/money";

import { IProductItem } from "components/home/types";

const SOURCE_LIST = [
  { id: "1", media: "(max-width: 408px)", size: "_200x200.jpg" },
  { id: "2", media: "(max-width: 509px)", size: "_250x250.jpg" },
  { id: "3", media: "(max-width: 767px)", size: "_300x300.jpg" },
  {
    id: "4",
    media: "(min-width: 768px) and (max-width: 832px)",
    size: "_250x250.jpg",
  },
  {
    id: "5",
    media: "(min-width: 832px) and (max-width: 1023px)",
    size: "_300x300.jpg",
  },
  {
    id: "6",
    media: "(min-width: 832px) and (max-width: 1023px)",
    size: "_300x300.jpg",
  },
];

interface IProductItemProps {
  item: IProductItem;
}

const ProductItem = ({ item }: IProductItemProps) => {
  return (
    <li className="list">
      <Link to={`/products/${item.id}`} className="list_link">
        <div className="list_element">
          <div className="image_wrap">
            <img
              src={item.images[0].src}
              className="test_img"
              alt={`${item.name}_상품 이미지`}
            />
          </div>
          <div className="image_dim" />
          <p className="item_name">{item.name}</p>
          <p className="item_price">
            {formatPrice(item.variants[0].price)} {""}원
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ProductItem;
