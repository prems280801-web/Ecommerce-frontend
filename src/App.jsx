import AdminOrders from "./pages/AdminOrders";
import AdminRoute from "./components/AdminRoute";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile";
import AdminProducts from "./pages/AdminProducts";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />
<Route
  path="/admin/products"
  element={
    <AdminRoute>
      <AdminProducts />
    </AdminRoute>
  }
/>
<Route
  path="/admin/orders"
  element={
    <AdminRoute>
      <AdminOrders />
    </AdminRoute>
  }
/>

          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}

export default App;