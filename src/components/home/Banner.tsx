import { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeleton from "components/home/Skeleton";

let firstLoaded = false;

const Banner = () => {
  const imageData = [
    {
      id: "banner_1",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/1_1200x400.jpg",
      },
      name: "하늘과 구름",
    },
    {
      id: "banner_2",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/2_1200x400.jpg",
      },
      name: "구름바다",
    },
    {
      id: "banner_3",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/3_1200x400.jpg",
      },
      name: "노을진 하늘",
    },
    {
      id: "banner_4",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/4_1200x400.jpg",
      },
      name: "노을과 호수 배경",
    },
    {
      id: "banner_5",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/5_1200x400.jpg",
      },
      name: "맑은 하늘에 뜬 태양",
    },
    {
      id: "banner_6",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/6_1200x400.jpg",
      },
      name: "안개 낀 바다",
    },
    {
      id: "banner_7",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/7_1200x400.jpg",
      },
      name: "구름과 하늘",
    },
    {
      id: "banner_8",
      urls: {
        "400x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_400x250.jpg",
        "600x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_600x250.jpg",
        "800x250":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_800x250.jpg",
        "800x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_800x400.jpg",
        "1000x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_1000x400.jpg",
        "1024x500":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_1024x500.jpg",
        "1200x400":
          "https://shopping-mall-api-lab-seoul.s3.ap-northeast-2.amazonaws.com/banner/8_1200x400.jpg",
      },
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
    appendDots: (dots: boolean) => (
      <div style={{ bottom: "10px" }}>
        <ul> {dots} </ul>
      </div>
    ),
  };

  function NextArrow(props: any) {
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

  function PrevArrow(props: any) {
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
                <picture>
                  <source
                    media="(max-width: 400px)"
                    srcSet={item.urls["400x250"]}
                  />
                  <source
                    media="(max-width: 600px)"
                    srcSet={item.urls["600x250"]}
                  />
                  <source
                    media="(max-width: 767px)"
                    srcSet={item.urls["800x250"]}
                  />
                  <source
                    media="(max-width: 800px)"
                    srcSet={item.urls["800x400"]}
                  />
                  <source
                    media="(max-width: 1000px)"
                    srcSet={item.urls["1000x400"]}
                  />
                  <source
                    media="(max-width: 1023px)"
                    srcSet={item.urls["1200x400"]}
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet={item.urls["1024x500"]}
                  />
                  <Image src={item.urls["1024x500"]} alt={item.name} />
                </picture>
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
