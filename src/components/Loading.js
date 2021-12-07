import React from "react";
import LoadingImg from "../images/Fading circles.gif";

const Loading = (hide) => {
  return (
    <div className="loading || !loading ? block : hide">
      <img className="loading-image" src={LoadingImg} alt="Loading..." />
    </div>
  );
};

export default Loading;
