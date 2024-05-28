const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  description: String ,
  file: String,
  user: String,
  email: String
});
const PostModal = mongoose.model("Posts", PostSchema);
module.exports = PostModal;
