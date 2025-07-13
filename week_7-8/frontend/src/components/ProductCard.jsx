import "../components/styles/productCard.css";
import { useCart } from "../context/CartContext";
const ProductCard = ({ product, view }) => {
    const { cartItems, addToCart } = useCart();
    const isInCart = cartItems.some((item) => item._id === product._id);
    return (
        <div className={`home_main ${view}`}>
            <div className={`card ${view}`}>
                <img src={product.image} alt={product.name} />
                <div className="card_details">
                    <h3>{product.name}</h3>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <button onClick={() => addToCart(product)} style={{
                        backgroundColor: isInCart ? "#4CAF50" : "#2196F3",
                        color: "#fff",
                        border: "none",
                        padding: "8px 12px",
                        cursor: "pointer",
                        borderRadius: "4px"
                    }}>Add to Cart</button>
                </div>
            </div>
        </div>
    )
};

export default ProductCard;