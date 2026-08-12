import { useDispatch } from "react-redux";
import { login } from "../redux/authSlice";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

function Login() {
  const navigate = useNavigate();
const dispatch = useDispatch();
  const [formData, setFormData] = useState({
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
     const res = await API.post("/auth/login", formData);

localStorage.setItem("token", res.data.token);

localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);
dispatch(
  login({
    user: res.data.user,
    token: res.data.token,
  })
);
alert("Login Successful");

navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">

        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>

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

          <button className="btn btn-primary w-100">
            Login
          </button>

          <p className="mt-3 text-center">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </p>

        </form>

      </div>
    </div>
  );
}

export default Login;