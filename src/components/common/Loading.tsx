import LoadingImg from "images/Fading circles.gif";

const Loading = () => {
  return (
    <div className="loading">
      <img className="loading-image" src={LoadingImg} alt="Loading..." />
    </div>
  );
};

export default Loading;
