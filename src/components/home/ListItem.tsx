import { Link } from "react-router-dom";
import { ListItemProps } from "types";

const ListItem = ({ item }: ListItemProps) => {
  return (
    <li className="list">
      <Link to={`/products/${item.id}`} className="list_link">
        <div className="list_element">
          <div className="image_wrap">
            <picture>
              <source
                media="(max-width: 408px)"
                srcSet={item.images[0].src.slice(0, -4) + "_200x200.jpg"}
              />
              <source
                media="(max-width: 509px)"
                srcSet={item.images[0].src.slice(0, -4) + "_250x250.jpg"}
              />
              <source
                media="(max-width: 767px)"
                srcSet={item.images[0].src.slice(0, -4) + "_300x300.jpg"}
              />
              <source
                media="(min-width: 768px) and (max-width: 832px)"
                srcSet={item.images[0].src.slice(0, -4) + "_250x250.jpg"}
              />
              <source
                media="(min-width: 832px) and (max-width: 1023px)"
                srcSet={item.images[0].src.slice(0, -4) + "_300x300.jpg"}
              />
              <img
                src={item.images[0].src.slice(0, -4) + "_300x300.jpg"}
                className="test_img"
                alt={`${item.name}_상품 이미지`}
              />
            </picture>
          </div>
          <div className="image_dim"></div>
          <p className="item_name">{item.name}</p>
          <p className="item_price">
            {item.variants[0].price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} {""}
            원
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
