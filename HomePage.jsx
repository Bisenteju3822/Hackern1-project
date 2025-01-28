import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddProductForm from "./AddProductForm";
import SearchBar from "./SearchBar";
import ProductList from "./ProductList";
import "./styles.css";

const HomePage = () => {
  const [products, setProducts] = useState(() => {
    const storedProducts = localStorage.getItem("products");
    return storedProducts ? JSON.parse(storedProducts) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found, redirecting to login...");
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const addProduct = (product) => {
    if (
      !products.some((p) => p.name.toLowerCase() === product.name.toLowerCase())
    ) {
      setProducts([...products, product]);
    } else {
      alert("Product already exists");
    }
  };

  const removeProduct = (index) => {
    const newProducts = [...products];
    newProducts.splice(index, 1);
    setProducts(newProducts);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log("Filtered products:", filteredProducts);
  console.log("Total products:", products.length);

  return (
    <div className="container">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <AddProductForm addProduct={addProduct} />
      <SearchBar setSearchQuery={setSearchQuery} />
      {filteredProducts.length > 0 ? (
        <ProductList
          products={filteredProducts}
          removeProduct={removeProduct}
        />
      ) : (
        <p style={{ color: "black" }}>No Product Found</p>
      )}
    </div>
  );
};

export default HomePage;
