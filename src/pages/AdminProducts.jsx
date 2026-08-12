import { useEffect, useState } from "react";
import API from "../services/api";

function AdminProducts() {
  const [products, setProducts] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await API.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      if (editingId) {
        await API.put(
          `/products/${editingId}`,
          formData,
          config
        );

        alert("Product Updated Successfully");
      } else {
        await API.post(
          "/products",
          formData,
          config
        );

        alert("Product Created Successfully");
      }

      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
      });

      setEditingId(null);

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Something went wrong"
      );
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);

    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      category: product.category,
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Delete Failed"
      );
    }
  };

  const cancelEdit = () => {
    setEditingId(null);

    setFormData({
      name: "",
      description: "",
      price: "",
      category: "",
    });
  };

  return (
    <div>
      <h2 className="mb-4">Admin Product Management</h2>

      {/* Product Form */}

      <div className="card p-4 mb-5">
        <h4 className="mb-3">
          {editingId ? "Update Product" : "Add Product"}
        </h4>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              className="form-control"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Description
            </label>

            <textarea
              name="description"
              className="form-control"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Price
            </label>

            <input
              type="number"
              name="price"
              className="form-control"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">
              Category
            </label>

            <select
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              <option value="Mobiles">Mobiles</option>
              <option value="Electronics">
                Electronics
              </option>
              <option value="Accessories">
                Accessories
              </option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-primary me-2"
          >
            {editingId
              ? "Update Product"
              : "Add Product"}
          </button>

          {editingId && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={cancelEdit}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* Product List */}

      <h4 className="mb-3">All Products</h4>

      <div className="row">
        {products.map((product) => (
          <div
            className="col-md-4 mb-4"
            key={product._id}
          >
            <div className="card h-100 p-3">
              <h5>{product.name}</h5>

              <p>{product.description}</p>

              <p>
                <strong>
                  ₹ {product.price}
                </strong>
              </p>

              <p>
                Category: {product.category}
              </p>

              <button
                className="btn btn-warning mb-2"
                onClick={() => handleEdit(product)}
              >
                Edit
              </button>

              <button
                className="btn btn-danger"
                onClick={() =>
                  handleDelete(product._id)
                }
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminProducts;