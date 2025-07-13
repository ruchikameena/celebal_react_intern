import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./styles/Cart.css"
const Cart = () => {
    const { cartItems, removeFromCart, total, increaseQty, decreaseQty } = useCart();
    const navigate = useNavigate();

    const handleProceedToCheckout = () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }
        navigate("/checkout");
    };

    return (
        <div className="cart_container">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <ul>
                        {cartItems.map((item) => (
                            <li key={item._id} className="cart_lists">
                                <img src={item.image} alt={item.name} width="80" height="80" style={{marginRight:'10px',padding:'4px',border:'1px solid #ccc'}}  />
                                <div className="cart_item_details">
                                    <h4 style={{marginBottom:"2px"}}>{item.name}</h4>
                                    <p> 
                                        Qty:
                                        <button onClick={() => decreaseQty(item._id)} style={{ margin: "0 5px",width:"20px" }}>-</button>
                                        {item.quantity}
                                        <button onClick={() => increaseQty(item._id)} style={{ margin: "0 5px",width:"20px" }}>+</button>
                                    </p>

                                    <p style={{marginBottom:"4px"}}>Price: Rs.{item.price * item.quantity}</p>
                                    <button onClick={() => removeFromCart(item._id)}>Remove</button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: Rs.{total}</h3>
                    <button onClick={handleProceedToCheckout} >Proceed to Checkout</button>
                </>
            )}
        </div>
    );
};

export default Cart;
