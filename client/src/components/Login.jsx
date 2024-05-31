import React, { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://blog-app-rust-two-25.vercel.app/auth/login", {
        email,
        password,
      })
      .then((result) => {
        if (result.data === "Record Not Existed") {
          alert("Record Not Existed");
        } else if (result.data === "Success") {
          window.location.href = "/dashboard";
        } else {
          alert("Incorrect Pass");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex justify-content-center align-items-center register-css">
      <div className="form-css rounded p-3">
        <h3>Login Form</h3>
        <div className="p-2 text-center">
          <Link to={"/login"} className="m-2 btn btn-primary">
            Login
          </Link>
          <Link to={"/register"} className="m-2 btn btn-light">
            Register
          </Link>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              placeholder="Enter Email"
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="m-2">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="m-2 mt-3">
            <button className="btn btn-success">Login</button>
          </div>
          <div>
            <h6>Forgot Password?</h6>
            <Link to={"/forgotpassword"} className="m-2 btn btn-danger">
              Reset Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
