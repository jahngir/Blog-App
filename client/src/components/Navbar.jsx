import React, { useContext } from "react";
import "./navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../App";
import axios from "axios";

const Navbar = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/auth/logout")
      .then((response) => {
        if (response.data.status) {
          navigate(0);
        } else if (response.data) {
          console.log(response.data);
        }
      })
      .catch((err) => console.log("err here" + err));
  };

  return (
    <div className="navbar-header">
      <div className="container mt-2">
        <Link to="/" className="site-logo d-flex align-items-center">
          Blog App
        </Link>
        <div className="navlinks d-flex align-items-center">
          <Link to="/" className=" link">
            Home
          </Link>
          {user.name ? (
            <Link to="/create" className="link">
              Create
            </Link>
          ) : (
            <></>
          )}

          <a href="" className="link">
            Contact
          </a>
        </div>
        {user.name ? (
          <div className="user">
            <div class="dropdown">
              <button class="dropbtn">{user.name}</button>
              <div class="dropdown-content">
                <Link to={"/dashboard"} className="">
                  Dashboard
                </Link>
                <a onClick={handleLogout} className="">
                  Logout
                </a>
              </div>
            </div>
          </div>
        ) : (
          <div className="user">
            <h5>
              <Link to="/register" className="btn btn-dark">
                Login/Register
              </Link>
            </h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
