import { useSelector, useDispatch } from "react-redux";
import API from "../services/api";
import { removeFromCart, clearCart } from "../redux/cartSlice";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const removeItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * (item.quantity || 1),
    0
  );

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");

      const orderData = {
        products: cartItems.map((item) => ({
          product: item._id,
          quantity: item.quantity || 1,
        })),
        totalAmount: total,
      };

      const res = await API.post("/orders", orderData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(res.data.message);

      dispatch(clearCart());

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Order Failed"
      );
    }
  };

  return (
    <div>
      <h2 className="mb-4">Shopping Cart</h2>

      {cartItems.length === 0 ? (
        <h4>Your cart is empty.</h4>
      ) : (
        <>
          {cartItems.map((item) => (
            <div
              key={item._id}
              className="card mb-3 p-3"
            >
              <h5>{item.name}</h5>

              <p>{item.description}</p>

              <h6>
                ₹ {item.price} ×{" "}
                {item.quantity || 1}
              </h6>

              <button
                className="btn btn-danger"
                onClick={() =>
                  removeItem(item._id)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <hr />

          <h3>Total: ₹ {total}</h3>

          <button
            className="btn btn-success mt-3"
            onClick={placeOrder}
          >
            Place Order
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;