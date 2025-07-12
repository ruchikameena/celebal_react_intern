import { Routes, Route } from "react-router-dom";
import Home from "../src/pages/Home";
import Cart from "../src/components/Cart";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default App;
