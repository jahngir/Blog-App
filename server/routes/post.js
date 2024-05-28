const express = require("express");
const router = express.Router();
const PostModal= require("../models/post");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const multer =require('multer')
const path =require('path')


dotenv.config();


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


  const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'Storage/Images')
    },
    filename: (req,file,cb)=>{
        cb(null,file.fieldname+ "_" +Date.now() + path.extname(file.originalname))
    }

  })

  const upload= multer({
    storage:storage
  })

  router.post("/create", upload.single('file') , verifyUser, (req, res) => {
    PostModal.create({title:req.body.title,
        description:req.body.description,
        file:req.file.filename,user:req.name,email:req.body.email})
        .then(res=>res.json(res))
        .catch(err=>res.json(err))

  });

router.get("/getposts",(req,res)=>{
  PostModal.find()
  .then(
    posts=>res.json(posts)
  )
  .catch(err=>res.json(err))
})
router.get("/getpostbyid/:id",(req,res)=>{
  const id =req.params.id
  PostModal.findById({_id:id})
  .then(
    posts=>res.json(posts)
  )
  .catch(err=>res.json(err))
})

router.put("/edit/:id",(req,res)=>{
  const id =req.params.id
  PostModal.findByIdAndUpdate({_id:id},{title:req.body.title,description:req.body.description})
  .then(result=>res.json(result))
.catch(err=>res.json(err))
})

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  PostModal.findByIdAndDelete({_id: id})
    .then(result => {
      res.json("Success");
      console.log("deleted");
    })
    .catch(err => res.json(err));
});


  module.exports = router;