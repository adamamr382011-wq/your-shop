import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // حالة الكتابة وحالة البحث المعتمد
  const [searchQuery, setSearchQuery] = useState("");
  const [submitQuery, setSubmitQuery] = useState("");

  // اعتماد البحث عند الضغط على الزر
  function handleSearch(e) {
    e.preventDefault();
    setSubmitQuery(searchQuery.trim());
  }

  useEffect(() => {
    setLoading(true);
    setError("");

    fetch(
      `https://dummyjson.com/products/search?q=${encodeURIComponent(submitQuery)}&limit=20`
    )
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
        setProducts([]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [submitQuery]);

  return (
    <div className="store">
      <header className="store-header">
        <h1>Trendyfy</h1>

        <form className="search-form" onSubmit={handleSearch}>
          <input
            className="search-input"
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <button className="search-btn" type="submit">
            Search
          </button>
        </form>
      </header>

      <main>
        {loading && (
          <div className="loading">
            <PropagateLoader color="#191928" />
          </div>
        )}

        {error && <p className="error-message">{error}</p>}

        {!loading && !error && products.length === 0 && (
          <p className="empty-message">No products found.</p>
        )}

        <div className="products-grid">
          {!loading &&
            products.map((product) => (
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
