import { useEffect, useState } from "react";
import { PropagateLoader } from "react-spinners";
import ProductCard from "./ProductCard";
import "./App.css";

const categories = [
  "all",
  "laptops",
  "vehicle",
  "fragrances",
];


function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  //البحث
  const [searchQuery, setSearchQuery] = useState("");
  const [submitQuery, setSubmitQuery] = useState("");

  //categories

  const [selectedCategory, setSelectedCategory] = useState("all");


  // اعتماد البحث عند الضغط على الزر
  function handleSearch(e) {
    e.preventDefault();
    setSubmitQuery(searchQuery.trim());
  }

  //category selection function
  function handlecategory(category) {

    setSelectedCategory(category);
    setSearchQuery('');
    setSubmitQuery('');
  }

  useEffect(() => {
    setLoading(true);
    setError("");

    let url = `https://dummyjson.com/products`;

    if (submitQuery) {

      url = `https://dummyjson.com/products/search?q=${submitQuery}`;

    } else if (selectedCategory !== "all") {

      url = `https://dummyjson.com/products/category/${selectedCategory}`;
    }

    fetch(
      url
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
  }, [submitQuery, selectedCategory]);

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

        {categories.map((cat) => (
          <button
            key={cat}
            className="cat-btn"
            onClick={() => handlecategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}

      </header>
     
      <p className="card-num">
        Number of products: <strong>{products.length}</strong>
      </p>

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
                discount={product.discountPercentage}
                availability={product.availabilityStatus}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export default App;
