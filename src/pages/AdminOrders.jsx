import { useEffect, useState } from "react";
import API from "../services/api";

function AdminOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(res.data);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to load orders"
      );
    }
  };

  const updateStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Order Status Updated Successfully");

      fetchOrders();
    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Failed to update order status"
      );
    }
  };

  return (
    <div>
      <h2 className="mb-4">Admin Order Management</h2>

      {orders.length === 0 ? (
        <h4>No orders found.</h4>
      ) : (
        orders.map((order) => (
          <div
            className="card mb-4 p-3"
            key={order._id}
          >
            <h5>
              Order ID: {order._id}
            </h5>

            <p>
              <strong>Customer:</strong>{" "}
              {order.user?.name}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {order.user?.email}
            </p>

            <p>
              <strong>Total Amount:</strong> ₹{" "}
              {order.totalAmount}
            </p>

            <p>
              <strong>Order Date:</strong>{" "}
              {new Date(
                order.createdAt
              ).toLocaleDateString()}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {order.status}
            </p>

            <div className="mb-3">
              <label className="form-label">
                Update Status
              </label>

              <select
                className="form-select"
                value={order.status}
                onChange={(e) =>
                  updateStatus(
                    order._id,
                    e.target.value
                  )
                }
              >
                <option value="Pending">
                  Pending
                </option>

                <option value="Processing">
                  Processing
                </option>

                <option value="Shipped">
                  Shipped
                </option>

                <option value="Delivered">
                  Delivered
                </option>
              </select>
            </div>

            <h6>Products:</h6>

            <ul>
              {order.products?.map((item, index) => (
                <li key={index}>
                  {item.product?.name} ×{" "}
                  {item.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}

export default AdminOrders;