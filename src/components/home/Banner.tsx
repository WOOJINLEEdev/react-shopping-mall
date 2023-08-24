/* eslint-disable react/no-unstable-nested-components */
import { CSSProperties, useState } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { getSizedImageUrl } from "utils/image";

import { IMAGE_DATA } from "components/home/banner-image-data";

const SOURCE_LIST = [
  {
    id: "0",
    media: "(max-width: 400px)",
    size: "_400x250.jpg",
  },
  {
    id: "1",
    media: "(max-width: 600px)",
    size: "_600x250.jpg",
  },
  {
    id: "2",
    media: "(max-width: 767px)",
    size: "_800x250.jpg",
  },
  {
    id: "3",
    media: "(max-width: 800px)",
    size: "_800x400.jpg",
  },
  {
    id: "4",
    media: "(max-width: 1000px)",
    size: "_1000x400.jpg",
  },
  {
    id: "5",
    media: "(max-width: 1023px)",
    size: "_1200x400.jpg",
  },
  {
    id: "6",
    media: "(max-width: 1024px)",
    size: "_1024x500.jpg",
  },
];

const Banner = () => {
  const bannerImageData = IMAGE_DATA;

  const [data, setData] = useState(bannerImageData);

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
    appendDots: (dots: boolean) => (
      <div style={{ bottom: "10px" }}>
        <ul> {dots} </ul>
      </div>
    ),
  };

  interface IArrowProps {
    className?: string;
    style?: CSSProperties;
    onClick?: () => void;
  }

  function NextArrow(props: IArrowProps) {
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

  function PrevArrow(props: IArrowProps) {
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
  width: 1024px;
  height: 500px;
  max-height: 100%;
  margin: 0;
  border-radius: 5px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    height: 250px;
    min-height: 250px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    height: 400px;
    min-height: 400px;
  }
`;
