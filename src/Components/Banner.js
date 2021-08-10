import React from "react";
import useSWR from "swr";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "./Skeleton.js";

const Container = styled.div`
  width: 1024px;
  height: 500px;
  margin-bottom: 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    height: 400px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 450px;
  }
`;

const StyledSlider = styled(Slider)`
  .slick-slide div {
    outline: none;
  }
`;

const SlideItem = styled.div`
  height: 500px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    height: 400px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    height: 450px;
  }
`;

const Image = styled.img`
  display: inline-block;
  width: 100%;
  max-height: 100%;
  margin: 0;
  border-radius: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    min-height: 400px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    min-height: 450px;
  }
`;

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        position: "absolute",
        right: "0",
        filter: "opacity(0.5) drop-shadow(0 0 0 white)",
        webkitFilter: "opacity(0.5) drop-shadow(0 0 0 white)",
        width: "50px",
        height: "50px",
      }}
      onClick={onClick}
    />
  );
}

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        left: "0",
        zIndex: "5",
        filter: "opacity(0.5) drop-shadow(0 0 0 white)",
        webkitFilter: "opacity(0.5) drop-shadow(0 0 0 white)",
        width: "50px",
        height: "50px",
      }}
      onClick={onClick}
    />
  );
}

function fetchImageUrl(delaySecond) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        url: `https://source.unsplash.com/random/1024x500/?white,${delaySecond}`,
      });
    }, 3000);
  });
}

function fetchImageUrls(key, numItem) {
  return Promise.all(
    Array.from(new Array(numItem)).map((_, index) => fetchImageUrl(index + 1))
  );
}

export default function SimpleSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    appendDots: (dots) => (
      <div style={{ bottom: "10px" }}>
        <ul> {dots} </ul>
      </div>
    ),
  };

  const items = [1, 2, 3, 4, 5, 6, 7, 8];

  const { data, error } = useSWR(
    ["bannerImageUrl", items.length],
    fetchImageUrls
  );
  if (!data && !error) return <Skeleton />;
  if (error) return <div>error!!</div>;

  return (
    <Container>
      <StyledSlider {...settings}>
        {data.map((item, index) => (
          <SlideItem key={index}>
            <Image src={item.url} />
          </SlideItem>
        ))}
      </StyledSlider>
    </Container>
  );
}
