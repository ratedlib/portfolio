import express from 'express';
import mongoose from 'mongoose';
import Comment from './model/comment.js';
import Experience from './model/experience.js';
import Blog from './model/blog.js';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());   

mongoose.connect('mongodb+srv://ratedlib:Penguin77%40mongodb@cluster0.besgul4.mongodb.net/photography?retryWrites=true&w=majority')
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.log("DB connection failed:", err));

app.get('/api/test', (req, res) => {
  res.json({ message: "Backend is working!" });
});

//comments
app.get('/api/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ message: "Failed to fetch comments", error: err.message });
  }
});

app.post('/api/comments', async (req, res) => {
  try {
    console.log("Received body:", req.body);
    const { name, comments } = req.body;
    const newComment = await Comment.create({ name, comments });
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/comments/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ message: "Failed to delete comment", error: err.message });
  }
});

//experiences
app.get('/api/experiences', async (req, res) => {
  try {
    const experiences = await Experience.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(experiences);
  } catch (err) {
    console.error("Error fetching experiences:", err);
    res.status(500).json({ message: "Failed to fetch experiences", error: err.message });
  }
});

app.get('/api/experiences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);
    if (!experience) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(experience);
  } catch (err) {
    console.error("Error fetching experience:", err);
    res.status(500).json({ message: "Failed to fetch experience", error: err.message });
  }
});

app.post('/api/experiences', async (req, res) => {
  try {
    console.log("Received experience:", req.body);
    const { title, company, location, startDate, endDate, description, type, technologies, order } = req.body;
    const newExperience = await Experience.create({
      title,
      company,
      location,
      startDate,
      endDate,
      description,
      type,
      technologies,
      order,
    });
    res.status(201).json(newExperience);
  } catch (err) {
    console.error("Error creating experience:", err);
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/experiences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, company, location, startDate, endDate, description, type, technologies, order } = req.body;
    const updated = await Experience.findByIdAndUpdate(
      id,
      { title, company, location, startDate, endDate, description, type, technologies, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating experience:", err);
    res.status(500).json({ message: "Failed to update experience", error: err.message });
  }
});

app.delete('/api/experiences/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Experience.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Experience not found" });
    }
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    console.error("Error deleting experience:", err);
    res.status(500).json({ message: "Failed to delete experience", error: err.message });
  }
});

//blogs
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ order: 1, createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    console.error("Error fetching blogs:", err);
    res.status(500).json({ message: "Failed to fetch blogs", error: err.message });
  }
});

app.post('/api/blogs', async (req, res) => {
  try {
    const { url, title, description, imageUrl, category, order } = req.body;
    const newBlog = await Blog.create({ url, title, description, imageUrl, category, order });
    res.status(201).json(newBlog);
  } catch (err) {
    console.error("Error creating blog:", err);
    res.status(500).json({ message: err.message });
  }
});

app.put('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { url, title, description, imageUrl, category, order } = req.body;
    const updated = await Blog.findByIdAndUpdate(
      id,
      { url, title, description, imageUrl, category, order },
      { new: true }
    );
    if (!updated) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error("Error updating blog:", err);
    res.status(500).json({ message: "Failed to update blog", error: err.message });
  }
});

app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Blog.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    console.error("Error deleting blog:", err);
    res.status(500).json({ message: "Failed to delete blog", error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
