import React, { useState } from "react";
import axios from "axios";
import useSWR from "swr";
import { useHistory } from "react-router-dom";
import QuantityCounter from "./QuantityCounter";
import Loading from "./Loading";
import PopupModal from "./PopupModal";
import styled from "styled-components";

const ItemDetail = ({ match }) => {
  const history = useHistory();
  const [quantity, setQuantity] = useState(1);
  const [itemOption, setItemOption] = useState({ option: "" });
  const [isOpen, setIsOpen] = useState(false);

  const url = `http://localhost:8282/v1/products/${match.params.productId}`;
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSWR(url, fetcher);

  if (error) return "에러 발생";
  if (!data) return <Loading />;

  const selectOptions = data.variants;

  const handleSelectChange = (e) => {
    console.log(e.target.value);

    selectOptions.map((variant) => {
      console.log("variant:", variant);
      if (e.target.value === variant.name) {
        console.log(variant.id);
        setItemOption(variant.id);
        return variant.id;
      }
    });
  };

  const token = localStorage.getItem("token");
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  function putItem() {
    console.log("장바구니 버튼 클릭");

    if (!token) {
      return alert("로그인 후 이용해주세요!");
    }

    axios
      .put(
        "http://localhost:8282/v1/me/cart",
        {
          items: [
            {
              product_id: data.id,
              variant_id: itemOption,
              quantity: quantity,
            },
          ],
        },
        config
      )
      .then(function (response) {
        console.log(response);
        setIsOpen(true);
      })
      .catch(function (error) {
        alert("옵션을 선택해주세요.");
        console.log(error);
      });
  }

  console.log("옵션체크", itemOption);

  const onRequestClose = () => {
    setIsOpen(false);
  };

  const yesOrNo = (e) => {
    if (e.target.name === "yes") {
      console.log("yes");
      window.location.replace("/cart");
    } else {
      console.log("no");
      setIsOpen(false);
    }
  };

  return (
    <div className="list_element_detail">
      <PopupModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        setIsOpen
        history
        yesOrNo={yesOrNo}
      />
      <div className="image_wrapper">
        <img className="image" alt="" src={data.images[0].src} />
      </div>

      <div className="image_text_wrap" id="imageTextWrap">
        <table className="list_table">
          <colgroup>
            <col className="col_width" />
            <col className="col_width" />
          </colgroup>
          <thead>
            <tr>
              <th className="thead_th" colspan="2" id="imageTextHead">
                {data.name}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th className="tbody_th">Price</th>
              <td className="tbody_td">
                <span id="imageTextBody">
                  {data.variants[0].price
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </span>
                원
              </td>
            </tr>
            <tr>
              <th className="tbody_th">size</th>
              <td className="tbody_td">
                <select className="td_select" onChange={handleSelectChange}>
                  <option value="">- [필수] 옵션을 선택해주세요 -</option>
                  {selectOptions.map((option) => (
                    <option>{option.option1}</option>
                  ))}
                </select>
              </td>
            </tr>
            <tr>
              <td></td>
              <td className="tbody_td_qty">
                <QuantityCounter
                  margin
                  flexEnd={false}
                  quantity={quantity}
                  onIncrement={() => setQuantity((qty) => qty + 1)}
                  onDecrement={() => setQuantity((qty) => qty - 1)}
                />
              </td>
            </tr>
          </tbody>
        </table>

        <table className="list_btn_table">
          <tbody>
            <tr>
              <td className="btn_td">
                <input
                  type="button"
                  className="list_btn cart"
                  value="장바구니"
                  onClick={putItem}
                />
              </td>
              <td className="btn_td">
                <input
                  type="button"
                  className="list_btn buy"
                  value="구매하기"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ItemDetail;
