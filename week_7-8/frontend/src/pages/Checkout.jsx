import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePayment = () => {
    // Simulate a payment process
    alert("Payment Successful! Thank you for your order.");
    clearCart();
    navigate("/"); // Redirect to home
  };

  useEffect(() => {
    if (cartItems.length === 0) {
      alert("Cart is empty. Add items before checkout.");
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Checkout Summary</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item._id}>
            {item.name} x {item.quantity} = ₹{item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}</h3>
      <button onClick={handlePayment}>Pay Now</button>
    </div>
  );
};

export default Checkout;
