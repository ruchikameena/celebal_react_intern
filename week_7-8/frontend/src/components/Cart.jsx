import { useEffect } from "react";
import { useCart } from "../context/CartContext";
// import "./Cart.css";
const Cart = () => {
    const { cartItems, removeFromCart, clearCart } = useCart();
    const total = cartItems.reduce((acc,item) => acc+item.price * item.quantity,0);

    const handlePlaceOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    alert("Your order has been placed successfully!");

    clearCart();
  };


    useEffect(()=>{
        console.log("cart updated: ",cartItems);
    },[cartItems]);

    return(
        <div className="cart_container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? ( <p>Your cart is empty.</p> ): (
                <>
                <ul>
                    {cartItems.map((item) => (
                        <li key={item._id}>
                            <img src={item.image} alt={item.name} width="80" />
                            <div>
                                <h4>{item.name}</h4>
                                <p>Qty: {item.quantity}</p>
                                <p>Price: Rs.{item.price*item.quantity}</p>
                                <button onClick={()=> removeFromCart(item._id)}>Remove</button>
                            </div>
                        </li>
                    ))}
                </ul>
                <h3>Total: Rs.{total}</h3>
                <button onClick={() => {handlePlaceOrder()}}>Proceed to Checkout</button>
                </>
            ) }
        </div>
    )
};

export default Cart;