import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "./blogs.css"

const EditPost = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const { id } = useParams();
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();

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

    axios
      .get("http://localhost:3001/api/getpostbyid/" + id)
      .then((posts) => {
        setTitle(posts.data.title);
        setDescription(posts.data.description);
      })
      .catch((err) => console.log(err));
  }, []); // Added navigate as a dependency

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put("http://localhost:3001/api/edit/" + id, { title, description })
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: "Blog Updated!",
          icon: "success",
        });

        navigate(`/singlepost/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center general-css">
      <div className="row rounded p-2">
        <form className="d-flex" onSubmit={handleSubmit}>
          {/* <div className="col-lg-4 col-md-6 col-sm-12">
            <div className="m-2">
              <label>Post Image</label>
              <input
                className="form-control"
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div> */}
          <div className="col-lg-8  col-md-6 col-sm-12">
            <div className="m-2">
              <label>New Post Title</label>
              <input
                className="form-control"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="m-2">
              <label>New Post Description</label>
              <textarea
                className="form-control"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="m-2">
              <button className="btn btn-success" type="Submit">
                Update Article
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPost;
