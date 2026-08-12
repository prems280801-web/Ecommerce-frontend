import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductCard({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    alert("Product added to cart");
  };

  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">

        <h5>{product.name}</h5>

        <p>{product.description}</p>

        <h4 className="text-success">
          ₹ {product.price}
        </h4>

        <p>{product.category}</p>

        <Link
          to={`/product/${product._id}`}
          className="btn btn-primary me-2"
        >
          View Details
        </Link>

        <button
          className="btn btn-success mt-2"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>

      </div>
    </div>
  );
}

export default ProductCard;