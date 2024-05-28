import React, { useState } from "react";
import "./form.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
const ResetPassword = () => {
  const [password, setPassword] = useState();
  const { token } = useParams();
  const navigate = useNavigate();

  //   axios.defaults.withCredentials = true;
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/resetpassword/" + token, { password })
      .then((response) => {
        if (response.data.status) {
          alert("Password Updated");
          navigate("/login");
        } else if (response.data) {
          alert("Some Error");
          console.log(response.data);
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="form-css bg-white rounded p-3">
        <h3>Reset Password</h3>
        <form onSubmit={handleSubmit}>
          <div className="m-2">
            <label>New Password</label>
            <input
              className="form-control"
              type="password"
              placeholder="Enter New Password"
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className="m-2 mt-3">
            <button className="btn btn-success">Submit</button>
          </div>
          <div>
            <h6>Already Have an Account</h6>
            <Link to={"/login"} className="m-2 btn btn-primary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
