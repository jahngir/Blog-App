import React, { useState } from "react";
import "./form.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/auth/forgotpassword", { email })
      .then((result) => {
        if (result.data === "Record Not Existed") {
          alert("Record Not Existed");
        } else if (result.data.status) {
            alert("Check your email")
          navigate("/login");
          
        } else {
          alert("Incorrect Email");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
        <div className="form-css bg-white rounded p-3">
          <h3>Forgot Password</h3>
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

            <div className="m-2 mt-3">
              <button className="btn btn-success">Send Mail</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
