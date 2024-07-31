import mongoose, { Schema } from "mongoose";


const postSchema = new Schema(
  {
    user: String,
    title: String,
    description: String,
    likes: Number, 
    views: Number,
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models.Post || mongoose.model("Post", postSchema);

export default Post;