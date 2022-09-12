import styled from "styled-components";

import BannerSkeleton from "components/home/BannerSkeleton";
import ProductListSkeleton from "components/home/ProductListSkeleton";

const HomeSkeleton = () => {
  return (
    <DivContainer>
      <BannerSkeleton />
      <ProductListSkeleton />
    </DivContainer>
  );
};

export default HomeSkeleton;

const DivContainer = styled.div`
  position: relative;
  width: 1024px;
  margin: 0 auto;
  padding-top: 50px;

  @media only screen and (min-width: 320px) and (max-width: 767px) {
    width: 100%;
    padding-top: 35px;
  }

  @media only screen and (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    padding-top: 40px;
  }
`;
