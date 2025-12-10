// server/models/Comment.js
import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;