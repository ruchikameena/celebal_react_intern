import { useCart } from "../context/CartContext";
import { useState } from "react";
import "./styles/Checkout.css";
const Checkout = () => {
  const { cartItems, total, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handlePayment = () => {
    alert("Payment Successful! Thank you for your order.");
    clearCart();
    setOrderPlaced(true);
  };

  if (orderPlaced) {
    return (
      <div className="checkout_main">
        <h2>Your order has been placed!</h2>
        <p>Thank you for shopping with us.</p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="checkout_main">
        <h2>No product added here 🛒</h2>
        <p>Please add items to your cart before checkout.</p>
      </div>
    );
  }

  return (
    <div className="checkout_main">
      <div className="checkout_main_data">
        <h2 style={{marginBottom:'10px'}}>Checkout Summary</h2>
      <ul style={{listStyle:'none'}}>
        {cartItems.map((item) => (
          <li key={item._id} >
            {item.name} x {item.quantity} = Rs. {item.price * item.quantity}
          </li>
        ))}
      </ul>
      <h3>Total: Rs. {total}</h3>
      <button onClick={handlePayment} style={{width:'100%',padding:'4px',marginTop:'10px'}}>Pay Now</button>
      </div>
    </div>
  );
};

export default Checkout;
