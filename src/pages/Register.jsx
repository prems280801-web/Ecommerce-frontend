import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", formData);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">

        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              onChange={handleChange}
              required
            />
          </div>

          <button className="btn btn-success w-100">
            Register
          </button>

          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Register;