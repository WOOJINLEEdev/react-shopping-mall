import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "components/home/Skeleton.js";
import BannerImage1 from "images/1.jpg";
import BannerImage2 from "images/2.jpg";
import BannerImage3 from "images/3.jpg";
import BannerImage4 from "images/4.jpg";
import BannerImage5 from "images/5.jpg";
import BannerImage6 from "images/6.jpg";
import BannerImage7 from "images/7.jpg";
import BannerImage8 from "images/8.jpg";

let firstLoaded = false;

const Banner = () => {
  const imageData = [
    {
      id: "banner_1",
      url: BannerImage1,
      name: "하늘과 구름",
    },
    {
      id: "banner_2",
      url: BannerImage2,
      name: "구름바다",
    },
    {
      id: "banner_3",
      url: BannerImage3,
      name: "노을진 하늘",
    },
    {
      id: "banner_4",
      url: BannerImage4,
      name: "노을과 호수 배경",
    },
    {
      id: "banner_5",
      url: BannerImage5,
      name: "맑은 하늘에 뜬 태양",
    },
    {
      id: "banner_6",
      url: BannerImage6,
      name: "안개 낀 바다",
    },
    {
      id: "banner_7",
      url: BannerImage7,
      name: "구름과 하늘",
    },
    {
      id: "banner_8",
      url: BannerImage8,
      name: "민들레꽃이 핀 초원과 하늘",
    },
  ];
  const bannerImageData = firstLoaded ? imageData : [];
  const [data, setData] = useState(bannerImageData);

  useEffect(() => {
    if (data.length === 0) {
      let ImageDataTimeout = setTimeout(() => {
        setData(imageData);
        firstLoaded = true;
      }, 3000);

      return () => {
        clearTimeout(ImageDataTimeout);
      };
    }
  }, []);

  if (data.length === 0) {
    return <Skeleton />;
  }

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
          width: "50px",
          height: "50px",
        }}
        onClick={onClick}
      />
    );
  }

  return (
    <Container>
      <StyledSlider {...settings}>
        {!data
          ? ""
          : data.map((item) => (
              <SlideItem key={item.id}>
                <Image src={item.url} alt={item.name} />
              </SlideItem>
            ))}
      </StyledSlider>
    </Container>
  );
};

export default Banner;

const Container = styled.div`
  width: 1024px;
  height: 500px;
  margin-bottom: 20px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    height: 250px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 400px;
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
    height: 250px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    height: 400px;
  }
`;

const Image = styled.img`
  display: inline-block;
  width: 100%;
  max-height: 100%;
  margin: 0;
  border-radius: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    min-height: 250px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    min-height: 400px;
  }
`;
