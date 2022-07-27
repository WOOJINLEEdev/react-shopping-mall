import LoadingImg from "assets/images/Fading circles.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img src={LoadingImg} className="loading_image" alt="Loading..." />
    </div>
  );
};

export default Loading;
