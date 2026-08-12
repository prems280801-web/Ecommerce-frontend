import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    setIsAdmin(user?.role === "admin");
  }, [location]);

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate("/login");
};

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          MERN Shop
        </Link>

        <div className="navbar-nav ms-auto">

          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/login">
            Login
          </Link>

          <Link className="nav-link" to="/register">
            Register
          </Link>

          <Link className="nav-link" to="/cart">
            Cart
          </Link>

          <Link className="nav-link" to="/my-orders">
            My Orders
          </Link>

          <Link className="nav-link" to="/profile">
            Profile
          </Link>

          {isAdmin && (
  <>
    <Link
      className="nav-link"
      to="/admin/products"
    >
      Admin Products
    </Link>

    <Link
      className="nav-link"
      to="/admin/orders"
    >
      Admin Orders
    </Link>
  </>
)}

          <button
            className="btn btn-danger ms-2"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;