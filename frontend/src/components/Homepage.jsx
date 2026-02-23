import About from "./homepage/About";
import Certificate from "./homepage/Certificate";
import ProductList from "./homepage/ProductList";
import ProductMain from "./homepage/ProductMain";
import Slide from "./homepage/Slide";

function Homepage() {
  return (
    <>
      {" "}
      <Slide />,
      <About />
      <ProductList />
      <ProductMain />
      <Certificate />
    </>
  );
}
export default Homepage;
