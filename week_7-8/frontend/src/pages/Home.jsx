import { useEffect, useState } from "react";
import API from "../api";
import ProductCard from "../components/ProductCard";
import "../pages/styles/home.css"
const Home = () => {
    const [products,setProducts] = useState([]);
    const [view, setView] = useState("grid");
    useEffect(()=>{
        API.get("/products").then((res)=>setProducts(res.data)).catch((err)=>console.error(err));
    },[]);
    return(
        <div className="home_container">
            <div className="toggle_button">
                <button onClick={() => setView("grid")}>Grid View</button>
                <button onClick={() => setView("list")}>List View</button>
            </div>
            <div className={`product-wrapper ${view}`}>
                {products.map((product)=>{
                    return <ProductCard key={product._id} product={product} view={view}/>
                })}
            </div>
        </div>
    )
};

export default Home;