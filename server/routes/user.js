const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const UserModal = require("../models/user");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const nodemailer = require("nodemailer");

dotenv.config();

// Register API

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const user = await UserModal.findOne({ email });
  if (user) {
    return res.json("User Already Exist");
  }

  await bcrypt
    .hash(password, 10)
    .then((hash) => {
      UserModal.create({ name, email, password: hash })
        .then((user) => res.json(user))
        .catch((err) => res.json(err));
    })
    .catch((err) => console.log(err.message));
});

router.post("/forgotpassword", async (req, res) => {
  const { email } = req.body;
  try {
    const user = await UserModal.findOne({ email });
    if (!user) {
      res.json("Record Not Existed");
    }
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      auth: {
        user: "liana.kuhn52@ethereal.email",
        pass: "PRgxkHMqeS1m7tdBc7",
      },
    });

    var mailOptions = {
      from: "newton.rath@ethereal.email",
      to: email,
      subject: "Reset Password",
      text: `http://localhost:5173/resetPassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ message: "error sending email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: true, message: "email sent" });
      }
    });
  } catch (err) {
    res.json(err);
  }
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  UserModal.findOne({ email: email })
    .then((user) => {
      if (!user) {
        res.json("Record Not Existed");
      } else {
        bcrypt.compare(password, user.password, (err, response) => {
          if (response) {
            const token = jwt.sign(
              { email: user.email, name: user.name },
              process.env.KEY,
              {
                expiresIn: "1d",
              }
            );
            res.cookie("token", token);
            return res.json("Success");
          } else {
            res.json(err);
          }
        });
      }
    })
    .catch((err) => res.json(err));
});

router.post("/resetpassword/:token", async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;
  try {
    const decoded = await jwt.verify(token, process.env.KEY);
    const id = decoded.id;
    const hashpassword = await bcrypt.hash(password, 10);
    await UserModal.findByIdAndUpdate({ _id: id }, { password: hashpassword });
    return res.json({ status: true, message: "Password Updated" });
  } catch (err) {
    return res.json("Invalid Token" + err);
  }
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json("Then Token was not available");
  } else {
    jwt.verify(token, process.env.KEY, (err, decoded) => {
      if (err) {
        res.json("Token is Wrong");
      }
      req.email = decoded.email;
      req.name = decoded.name;
      next();
    });
  }
};

router.get("/verify", verifyUser, (req, res) => {
  return res.json({ status: true, message: "Success" });
});


router.get("/", verifyUser, (req, res) => {
  return res.json({ email:req.email, name:req.name});
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ status: true, message: "Logout" });
});

module.exports = router;
