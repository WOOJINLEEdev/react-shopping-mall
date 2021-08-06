import React, { useState } from "react";
import { Prompt } from "react-router-dom";

const Popup = () => {
  const [shouldConfirm, setShouldConfirm] = useState(true);
  const message = "장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?";

  return <Prompt when={shouldConfirm} message={message}></Prompt>;
};

export default Popup;
