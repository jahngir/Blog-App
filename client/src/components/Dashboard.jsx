import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../App";
import "./home.css";

const Dashboard = () => {
  const user = useContext(userContext);

  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  const handleLogout = () => {
    axios
      .get("http://localhost:3001/auth/logout")
      .then((response) => {
        if (response.data.status) {
          navigate("/login");
        } else if (response.data) {
          console.log(response.data);
        }
      })
      .catch((err) => console.log("err here" + err));
  };

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/verify")
      .then((response) => {
        if (response.data.status) {
          console.log("Dashboard");
        } else if (response.data) {
          navigate("/login");
          console.log(response.data);
        }
      })
      .catch((err) => console.log("err here" + err));
  }, [navigate]);

  useEffect(() => {
    if (user && user.email) {
      axios
        .get("http://localhost:3001/api/getposts")
        .then((response) => {
          const userPosts = response.data.filter(
            (post) => post.email === user.email
          );
          setPosts(userPosts);
          console.log(userPosts);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  return (
    <>
      <div className="container py-5">
        <div className="section">
          <h1>Dashboard</h1>
          <Link to={"/"} className="btn btn-primary m-2">
            Home
          </Link>
          <Link to={"/create"} className="btn btn-outline-info m-2">
            Create Post
          </Link>
          <button className="btn btn-danger m-2" onClick={handleLogout}>
            Logout
          </button>
        </div>

        <div className="section">
          <h2>Your Blogs</h2>

          <div className="container">
            <div className="row">
              {posts.map((post) => (
                <div className="col-lg-4 col-sm-6 col-xm-12">
                  <Link
                    to={`/singlepost/${post._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card mb-3">
                      <div className="img-css">
                        <img
                          src={`http://localhost:3001/Images/${post.file}`}
                          alt="Post Image Here"
                        ></img>
                      </div>

                      <div className="card-content">
                        <h4>{post.title}</h4>
                        <p>{post.description}</p>
                        <span>Author: {post.user}</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
