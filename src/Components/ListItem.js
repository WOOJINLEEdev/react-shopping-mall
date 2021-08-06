import React from "react";
import { Link } from "react-router-dom";

const ListItem = ({ item }) => {
  return (
    <li className="list">
      <div className="list_element">
        <div className="image_wrap">
          <Link to={`/products/${item.id}`} className="hi">
            <img className="test_img" alt="" src={item.images[0].src} />
          </Link>
        </div>
        <p className="item_name">{item.name}</p>
        <p className="item_price">
          {item.variants[0].price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
          {""}원
        </p>
      </div>
    </li>
  );
};

export default ListItem;
