import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  imageUrl: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: 'General',
  },
  order: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', BlogSchema);
export default Blog;

