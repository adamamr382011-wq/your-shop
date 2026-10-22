import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products?limit=20")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load products");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.products);
      })
      .catch(() => {
        setError("حصلت مشكلة في تحميل المنتجات. اتأكد من الإنترنت.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="store">
      <header className="store-header">
        <h1>Trendyfy</h1>
        <p>Discover your favorite products</p>
      </header>

      <main>
        {loading && <p>Loading products...</p>}
        {error && <p>{error}</p>}

        <div className="products-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              thumbnail={product.thumbnail}
              title={product.title}
              price={product.price}
              rating={product.rating}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;





