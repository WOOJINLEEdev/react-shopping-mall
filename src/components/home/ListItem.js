import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
  return (
    <li className="list">
      <Link to={`/products/${item.id}`} className="list_link">
        <div className="list_element">
          <div className="image_wrap">
            <img
              src={item.images[0].src}
              className="test_img"
              alt={`${item.name} 이름을 가진 상품 이미지`}
            />
          </div>
          <div className="image_dim"></div>
          <p className="item_name">{item.name}</p>
          <p className="item_price">
            {item.variants[0].price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {""}원
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ListItem;
