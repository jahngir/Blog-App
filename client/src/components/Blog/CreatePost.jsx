import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { userContext } from "../../App";
import "./blogs.css"

const CreatePost = () => {
  const user = useContext(userContext);
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [file, setFile] = useState();

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
  }, []); // Added navigate as a dependency

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("email", user.email);
    formData.append("file", file);

    axios
      .post("http://localhost:3001/api/create", formData)
      .then((res) => {
        Swal.fire({
          title: "Good job!",
          text: "Blog Posted!",
          icon: "success",
        });

        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="conatiner create-css">
        <div className="d-flex justify-content-center align-items-center">
          <div className="row rounded p-2">
            <form className="d-flex" onSubmit={handleSubmit}>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="m-2">
                  <label>Post Image</label>
                  <input
                    className="form-control"
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              </div>
              <div className="col-lg-8  col-md-6 col-sm-12">
                <div className="m-2">
                  <label>Post Title</label>
                  <input
                    className="form-control"
                    type="text"
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="m-2">
                  <label>Post Description</label>
                  <textarea
                    className="form-control"
                    type="text"
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <div className="m-2">
                  <button className="btn btn-success" type="Submit">
                    Submit Article
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
