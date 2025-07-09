import "../components/styles/productCard.css";
const ProductCard = ({product,view}) => {
    return(
        <div className={`card ${view}`}>
            <img src={product.image} alt={product.name} width="150" />
            <div className="card_details">
                <h3>{product.name}</h3>
                <p>{product.category}</p>
                <p>{product.price}</p>
                <button onClick={() => alert("added to cart!")}>Add to Cart</button>
            </div>
        </div>
    )
};

export default ProductCard;