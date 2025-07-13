import { Link } from "react-router-dom";
import "../components/styles/Navbar.css"; 
const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">ShopperEzy</h2>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/checkout">Checkout</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
