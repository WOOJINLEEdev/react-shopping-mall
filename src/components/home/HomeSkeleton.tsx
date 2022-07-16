import styled from "styled-components";

import ProductListSkeleton from "components/home/ProductListSkeleton";
import Skeleton from "components/home/Skeleton";

const HomeSkeleton = () => {
  return (
    <DivContainer>
      <Skeleton />
      <ProductListSkeleton />
    </DivContainer>
  );
};

export default HomeSkeleton;

const DivContainer = styled.div`
  padding-top: 50px;
`;
