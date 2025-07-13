import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import "../pages/styles/home.css"
const Home = () => {
    const [products,setProducts] = useState([]);
    const [view, setView] = useState("grid");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(()=>{
        API.get("/products").then((res)=>setProducts(res.data)).catch((err)=>console.error(err));
    },[]);

    const filterProduct = products.filter((product) => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) || product.category.toLowerCase().includes(searchTerm.toLowerCase()) );

    return(
        <div className="home_container">
            <div className="top_controls">
                <input type="text" placeholder="Search products..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="search_product"/>
                <div className="toggle_button">
                <button className="toggle_button_des" onClick={() => setView("grid")}>Grid View</button>
                <button className="toggle_button_des" onClick={() => setView("list")}>List View</button>
            </div>
            </div>
            <div className={`product-wrapper ${view}`}>
                {filterProduct.length>0?(filterProduct.map((product) => (<ProductCard key={product._id} product={product} view={view}/>))) :(
                    <p>No product found.</p>
                )
                }
            </div>
        </div>
    )
};

export default Home;