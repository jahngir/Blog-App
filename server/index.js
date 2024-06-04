const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModal = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const UserRouter = require("./routes/user");
const PostRouter = require("./routes/post");


dotenv.config();
const app = express();

// Why Express JS?

// Express was created to make APIs and web applications with ease,
// It saves a lot of coding time almost by half and still makes web and
// mobile applications are efficient.
// Another reason for using express is that it is written in javascript as javascript is an easy language even if you don't have a previous

// restrictions for API which page to asscess and which not in cors
app.use(
  cors({
    origin: ["https://blogappclient-jahangir-naseers-projects.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.static('storage'))
mongoose.connect(process.env.MONGO_DB);


//New Auth API
app.use('/auth',UserRouter)

app.use('/api',PostRouter)

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});






// OLD WORK



// JWT Token Auth Verification

// const verifyUser = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json("Then Token was not available");
//   } else {
//     jwt.verify(token, process.env.KEY, (err, decoded) => {
//       if (err) {
//         res.json("Token is Wrong");
//       }
//       next();
//     });
//   }
// };

// JWT Auth verification API

// app.get("/home", verifyUser, (req, res) => {
//   return res.json("Success");
// });

// Register API

//OLD API
// app.post("/register", (req, res) => {
//   const { name, email, password } = req.body;
//   bcrypt
//     .hash(password, 10)
//     .then((hash) => {
//       UserModal.create({ name, email, password: hash })
//         .then((user) => res.json(user))
//         .catch((err) => res.json(err));
//     })
//     .catch((err) => console.log(err.message));
// });





// Login API

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   UserModal.findOne({ email: email })
//     .then((user) => {
//       if (user) {
//         bcrypt.compare(password, user.password, (err, response) => {
//           if (response) {
//             const token = jwt.sign({ email: user.email }, "jwt-secret-key", {
//               expiresIn: "1d",
//             });
//             res.cookie("token", token);
//             res.json("Success");
//           } else {
//             res.json(err);
//           }
//         });
//       } else {
//         res.json("Record Not Existed");
//       }
//     })
//     .catch((err) => res.json(err));
// });