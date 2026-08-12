import { useEffect, useState } from "react";
import API from "../services/api";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/myorders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <h4>Loading orders...</h4>;
  }

  return (
    <div>
      <h2 className="mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <h4>No orders found.</h4>
      ) : (
        orders.map((order) => (
          <div className="card mb-4 p-3" key={order._id}>
            <h5>Order ID: {order._id}</h5>

            <p>
              <strong>Status:</strong> {order.status}
            </p>

            <p>
              <strong>Total:</strong> ₹ {order.totalAmount}
            </p>

            <h6>Products:</h6>

            {order.products.map((item) => (
              <div key={item._id}>
                {item.product?.name || "Product"} — Quantity:{" "}
                {item.quantity}
              </div>
            ))}

            <small className="text-muted">
              Ordered on:{" "}
              {new Date(order.createdAt).toLocaleDateString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

export default MyOrders;