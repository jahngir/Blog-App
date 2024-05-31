import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./components/Home";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";
import axios from "axios";
import CreatePost from "./components/Blog/CreatePost";
import SinglePost from "./components/Blog/SinglePost";
import EditPost from "./components/Blog/EditPost";
import Footer from "./components/Footer";

export const userContext = createContext();
// createContext is a method provided by React's Context API that facilitates a
// way to pass data through the component tree without having to pass props
// down manually at every level. It's especially useful for passing down state,
// functions, or other data to deeply nested child components without prop drilling.

function App() {
  const [user, setUser] = useState({});

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("https://blog-app-rust-two-25.vercel.app/auth/")
      .then((user) => {
        setUser(user.data);
      })
      .catch((err) => console.log("err here" + err));
  }, []); // Added navigate as a dependency

  return (
    <>
      <userContext.Provider value={user}>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/register" element={<Signup />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Home />}></Route>
            <Route path="/forgotpassword" element={<ForgotPassword />}></Route>
            <Route
              path="/resetpassword/:token"
              element={<ResetPassword />}
            ></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            {/* blog components routes */}
            <Route path="/create" element={<CreatePost />}></Route>
            <Route path="/singlepost/:id" element={<SinglePost />}></Route>
            <Route path="/editpost/:id" element={<EditPost />}></Route>
          </Routes>
          <Footer />
        </BrowserRouter>
      </userContext.Provider>
    </>
  );
}

export default App;
