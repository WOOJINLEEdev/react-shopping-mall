import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const DaumPost = ({ showModal }) => {
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [isOpenPost, setIsOpenPost] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }

    console.log(data);

    console.log(data.zonecode);
    console.log(fullAddress);

    setAddress("abc");
    setAddressDetail(fullAddress);
    setIsOpenPost(false);

    console.log(address);
    console.log(addressDetail);
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "100",
    padding: "7px",
    width: "500px",
    height: "500px",
  };

  return (
    <>
      {showModal ? (
        <DaumPostcode
          onComplete={handleComplete}
          style={postCodeStyle}
          autoResize
          autoClose
          autoMapping={true}
        />
      ) : null}
    </>
  );
};

export default DaumPost;
