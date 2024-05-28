import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { userContext } from "../App";
import "./home.css";

const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const user = useContext(userContext);
  const [posts, setPosts] = useState([]);

  // const handleLogout = () => {
  //   axios
  //     .get("http://localhost:3001/auth/logout")
  //     .then((response) => {
  //       if (response.data.status) {
  //         navigate("/login");
  //       } else if (response.data) {
  //         console.log(response.data);
  //       }
  //     })
  //     .catch((err) => console.log("err here" + err));
  // };

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getposts")
      .then((posts) => {
        console.log(posts);
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="container">
        <div id="top-sec" className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex align-items-center justify-conten-center">
            <div>
              <h1>
                Hi, My Name is{" "}
                <span className="focus-text">Jahangir Naseer</span>.
              </h1>
              <h1>CMS Developer</h1>
              <p className="paragraph-text">
                Specialized in CMS Development, currenlty learning React and
                Node.
              </p>
              <div className="btn-div">
                <Link className="btn btn-two">About Me</Link>
                <Link className="btn btn-one">Contact Me</Link>
              </div>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center img-box">
            <img src="http://localhost:3001/Images/profile.png"></img>
          </div>
        </div>
      </div>
      <div className="section" id="featured-blogs">
        <div className="container">
          <div className="row heading">
            <div className="col-lg-6 col-md-6 col-sm-6">
              <h2>Featured Blogs</h2>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 text-end ">
              <span className="hover-css">
                View All
                <object
                  className="svg-css"
                  data="http://localhost:3001/Images/arrow-up.svg"
                ></object>
              </span>
            </div>
          </div>

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
      <div className="section" id="blog-categories">
        <div className="container">
          <h1 className="heading text-center">Browse By Category</h1>
          <p className="info text-center">
            Select a category to see more related content
          </p>
          <div className="row d-flex align-items-center justify-content-center">
            <div className="col-lg-10 mx-auto">
              <div className="row text-center">
                <div className="col-lg-4 col-md-4 col-sm-6 col-xm-12">
                  <div className="category">Category Name</div>
                  <div className="category">Category Name</div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xm-12">
                  <div className="category">Category Name</div>
                  <div className="category">Category Name</div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-6 col-xm-12">
                  <div className="category">Category Name</div>
                  <div className="category">Category Name</div>
                </div>
                <div className="col-12 text-center ">
              <span className="hover-css">
                View All
                <object
                  className="svg-css"
                  data="http://localhost:3001/Images/arrow-up.svg"
                ></object>
              </span>
            </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
