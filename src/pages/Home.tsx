import Clock from "components/home/Clock";
import Banner from "components/home/Banner";
import ProductList from "components/home/ProductList";
import CommonAsyncBoundary from "components/common/CommonAsyncBoundary";

const Home = () => {
  return (
    <>
      <Clock />
      <Banner />
      <CommonAsyncBoundary>
        <ProductList />
      </CommonAsyncBoundary>
    </>
  );
};

export default Home;
