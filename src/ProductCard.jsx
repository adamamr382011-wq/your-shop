
import { FaStar, FaShoppingCart, FaTag } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ thumbnail, title, price, rating }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={thumbnail} alt={title} />
      </div>

      <div className="product-info">
        <h3>{title}</h3>

        <div className="product-rating">
          <FaStar className="star-icon" />
          <span>{rating ?? "4.5"}</span>
        </div>

        <p className="product-price">
          <FaTag /> {Number(price).toLocaleString("en-US")} EGP
        </p>

        <button className="add-to-cart">
          <FaShoppingCart /> أضف إلى السلة
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
