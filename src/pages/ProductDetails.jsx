import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await API.get(`/products/${id}`);
      setProduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="card shadow p-4">
      <h2>{product.name}</h2>

      <p>{product.description}</p>

      <h3 className="text-success">₹ {product.price}</h3>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Stock:</strong> {product.stock}
      </p>

      <button
  className="btn btn-primary"
  onClick={() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(product);

    localStorage.setItem("cart", JSON.stringify(cart));

    alert("Product Added To Cart");
  }}
>
  Add To Cart
</button>
    </div>
  );
}

export default ProductDetails;