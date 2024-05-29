import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { userContext } from "../../App";

const SinglePost = () => {
  const user = useContext(userContext);
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3001/api/getpostbyid/" + id)
      .then((posts) => {
        console.log(posts);
        setPosts(posts.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3001/api/delete/" + id)
      .then((result) => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="p-2">
      <div className="post-btns container">
        {user.email === posts.email ? (
          <div className="d-flex justify-content-end">
            <Link to={`/editpost/${posts._id}`} className="m-2 btn btn-info">
              Edit Post
            </Link>
            <button
              className="m-2 btn btn-danger"
              onClick={() => handleDelete(posts._id)}
            >
              Delete Post
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="container single-css">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-12 col-xm-12">
            <img
              src={`http://localhost:3001/Images/${posts.file}`}
              alt="Post Image Here"
            ></img>
           
            </div>
            <div className="col-lg-8 col-md-8 col-sm-12 col-xm-12 py-3">
            <span className="author-css">Author: {posts.user}</span>
            <h2>{posts.title}</h2>
            <p>{posts.description}</p>
           

            </div>
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
