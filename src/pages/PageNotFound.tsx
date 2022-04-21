import styled from "styled-components";

const PageNotFound = () => {
  return <Div>Page Not Found!</Div>;
};

export default PageNotFound;

const Div = styled.div`
  width: 100%;
  height: calc(100vh - 171px);
  line-height: calc(100vh - 171px);
  font-size: 35px;
  font-weight: bold;
  background: #fff;
  text-align: center;
`;
