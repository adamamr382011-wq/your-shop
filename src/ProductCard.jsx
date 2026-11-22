
import {
  FaStar,
  FaShoppingCart,
  FaTag,
  FaPercent,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";

import "./ProductCard.css";

function ProductCard({
  thumbnail,
  title,
  price,
  rating,
  discount,
  availability,
}) {
  const isAvailable = availability === "In Stock";

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

        <p className="product-discount">
          <FaPercent />
          Discount: {discount ?? 0}%
        </p>

        <p
          className={`product-availability ${
            isAvailable ? "in-stock" : "out-of-stock"
          }`}
        >
          {isAvailable ? <FaCheckCircle /> : <FaTimesCircle />}
          {availability ?? "Unknown"}
        </p>

        <button className="add-to-cart" disabled={!isAvailable}>
          <FaShoppingCart /> أضف إلى السلة
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
