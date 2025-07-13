import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Cart from "../src/components/Cart";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </>
  );
};

export default App;
