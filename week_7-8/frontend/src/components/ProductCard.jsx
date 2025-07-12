import "../components/styles/productCard.css";
import { useCart } from "../context/CartContext";
const ProductCard = ({product,view}) => {
    const { addToCart } = useCart();
    return(
        <div className={`card ${view}`}>
            <img src={product.image} alt={product.name} width="150" />
            <div className="card_details">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <button onClick={() => {
                    console.log("product passed to addtocart:",product);
                    addToCart(product)}}>Add to Cart</button>
            </div>
        </div>
    )
};

export default ProductCard;