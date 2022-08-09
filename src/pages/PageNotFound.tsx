import styled from "styled-components";

const PageNotFound = () => {
  return <DivContainer>This page could not be found.</DivContainer>;
};

export default PageNotFound;

const DivContainer = styled.div`
  width: 100%;
  height: calc(100vh - 171px);
  line-height: calc(100vh - 171px);
  font-size: 35px;
  font-weight: bold;
  background: #fff;
  text-align: center;
`;
