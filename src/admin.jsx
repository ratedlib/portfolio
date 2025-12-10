'use client';
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaEdit, FaPlus, FaSave, FaTimes, FaLock, FaUnlock, FaExternalLinkAlt } from "react-icons/fa";
import { HiOutlineBriefcase, HiOutlineCode, HiOutlineChatAlt2, HiOutlineBookOpen } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
import './index.css';

const ADMIN_PIN = "210903";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [activeTab, setActiveTab] = useState('comments');
  
  // Comments state
  const [comments, setComments] = useState([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  
  // Experiences state
  const [experiences, setExperiences] = useState([]);
  const [experiencesLoading, setExperiencesLoading] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [editingExperience, setEditingExperience] = useState(null);
  const [experienceForm, setExperienceForm] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    description: '',
    type: 'work',
    technologies: '',
    order: 0,
  });

  // Blogs state
  const [blogs, setBlogs] = useState([]);
  const [blogsLoading, setBlogsLoading] = useState(false);
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [blogForm, setBlogForm] = useState({
    url: '',
    title: '',
    description: '',
    imageUrl: '',
    category: 'General',
    order: 0,
  });

  const navigate = useNavigate();

  // Handle PIN submission
  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError('');
      fetchComments();
      fetchExperiences();
      fetchBlogs();
    } else {
      setPinError('Invalid PIN. Please try again.');
      setPin('');
    }
  };

  // ============ COMMENTS ============
  const fetchComments = async () => {
    setCommentsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/comments');
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  const handleDeleteComment = async (id) => {
    if (!confirm('Are you sure you want to delete this comment?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setComments(comments.filter(c => c._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete comment:', error);
    }
  };

  // ============ EXPERIENCES ============
  const fetchExperiences = async () => {
    setExperiencesLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/experiences');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setExperiencesLoading(false);
    }
  };

  const resetExperienceForm = () => {
    setExperienceForm({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      description: '',
      type: 'work',
      technologies: '',
      order: 0,
    });
    setEditingExperience(null);
    setShowExperienceForm(false);
  };

  const handleEditExperience = (exp) => {
    setExperienceForm({
      title: exp.title,
      company: exp.company,
      location: exp.location || '',
      startDate: exp.startDate,
      endDate: exp.endDate || '',
      description: exp.description,
      type: exp.type,
      technologies: exp.technologies ? exp.technologies.join(', ') : '',
      order: exp.order || 0,
    });
    setEditingExperience(exp._id);
    setShowExperienceForm(true);
  };

  const handleExperienceSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...experienceForm,
      technologies: experienceForm.technologies
        ? experienceForm.technologies.split(',').map(t => t.trim()).filter(t => t)
        : [],
    };

    try {
      if (editingExperience) {
        const response = await fetch(`http://localhost:5000/api/experiences/${editingExperience}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          fetchExperiences();
          resetExperienceForm();
        }
      } else {
        const response = await fetch('http://localhost:5000/api/experiences', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (response.ok) {
          fetchExperiences();
          resetExperienceForm();
        }
      }
    } catch (error) {
      console.error('Failed to save experience:', error);
    }
  };

  const handleDeleteExperience = async (id) => {
    if (!confirm('Are you sure you want to delete this experience?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/experiences/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setExperiences(experiences.filter(e => e._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete experience:', error);
    }
  };

  // ============ BLOGS ============
  const fetchBlogs = async () => {
    setBlogsLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      const data = await response.json();
      setBlogs(data);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setBlogsLoading(false);
    }
  };

  const resetBlogForm = () => {
    setBlogForm({
      url: '',
      title: '',
      description: '',
      imageUrl: '',
      category: 'General',
      order: 0,
    });
    setEditingBlog(null);
    setShowBlogForm(false);
  };

  const handleEditBlog = (blog) => {
    setBlogForm({
      url: blog.url,
      title: blog.title,
      description: blog.description || '',
      imageUrl: blog.imageUrl || '',
      category: blog.category || 'General',
      order: blog.order || 0,
    });
    setEditingBlog(blog._id);
    setShowBlogForm(true);
  };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBlog) {
        const response = await fetch(`http://localhost:5000/api/blogs/${editingBlog}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogForm),
        });
        if (response.ok) {
          fetchBlogs();
          resetBlogForm();
        }
      } else {
        const response = await fetch('http://localhost:5000/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(blogForm),
        });
        if (response.ok) {
          fetchBlogs();
          resetBlogForm();
        }
      }
    } catch (error) {
      console.error('Failed to save blog:', error);
    }
  };

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return;
    try {
      const response = await fetch(`http://localhost:5000/api/blogs/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setBlogs(blogs.filter(b => b._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  // Logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setPin('');
  };

  // PIN Entry Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500 flex items-center justify-center px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-10 max-w-md w-full">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <FaLock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-arimo font-bold text-gray-900 mb-2">Admin Access</h1>
            <p className="text-gray-600">Enter your PIN to access the admin panel</p>
          </div>

          <form onSubmit={handlePinSubmit} className="space-y-6">
            <div>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="Enter PIN"
                maxLength={6}
                className="w-full px-6 py-4 text-center text-2xl font-mono tracking-[0.5em] border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 text-gray-900"
                autoFocus
              />
              {pinError && (
                <p className="text-red-500 text-sm mt-2 text-center">{pinError}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white py-4 rounded-2xl font-arimo font-semibold text-lg hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Unlock
            </button>
          </form>

          <Link
            to="/"
            className="flex items-center justify-center gap-2 mt-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <IoArrowBack className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Admin Dashboard
  return (
    <div className="min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-gray-600 hover:text-gray-900 transition-colors">
              <IoArrowBack className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-arimo font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-600 rounded-xl font-medium hover:bg-red-200 transition-colors"
          >
            <FaUnlock className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-4 mb-8">
          <button
            onClick={() => setActiveTab('comments')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-arimo font-medium transition-all duration-300 ${
              activeTab === 'comments'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <HiOutlineChatAlt2 className="w-5 h-5" />
            Comments ({comments.length})
          </button>
          <button
            onClick={() => setActiveTab('experiences')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-arimo font-medium transition-all duration-300 ${
              activeTab === 'experiences'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <HiOutlineBriefcase className="w-5 h-5" />
            Experiences ({experiences.length})
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-arimo font-medium transition-all duration-300 ${
              activeTab === 'blogs'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            <HiOutlineBookOpen className="w-5 h-5" />
            Blogs ({blogs.length})
          </button>
        </div>

        {/* Comments Tab */}
        {activeTab === 'comments' && (
          <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
            <h2 className="text-2xl font-arimo font-bold text-gray-900 mb-6">Manage Comments</h2>
            
            {commentsLoading ? (
              <div className="flex justify-center py-10">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
              </div>
            ) : comments.length === 0 ? (
              <p className="text-center text-gray-500 py-10">No comments yet.</p>
            ) : (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div
                    key={comment._id}
                    className="bg-gray-50 rounded-2xl p-5 flex items-start justify-between gap-4 hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                      <p className="text-gray-700 mt-1">{comment.comments}</p>
                      <p className="text-sm text-gray-500 mt-2">
                        {new Date(comment.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="p-3 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                      title="Delete comment"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Experiences Tab */}
        {activeTab === 'experiences' && (
          <div className="space-y-6">
            {!showExperienceForm && (
              <button
                onClick={() => setShowExperienceForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-arimo font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <FaPlus className="w-4 h-4" />
                Add New Experience
              </button>
            )}

            {showExperienceForm && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-arimo font-bold text-gray-900">
                    {editingExperience ? 'Edit Experience' : 'Add New Experience'}
                  </h2>
                  <button
                    onClick={resetExperienceForm}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleExperienceSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={experienceForm.title}
                        onChange={(e) => setExperienceForm({ ...experienceForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                        required
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Company/Project Name *</label>
                      <input
                        type="text"
                        value={experienceForm.company}
                        onChange={(e) => setExperienceForm({ ...experienceForm, company: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                        required
                        placeholder="e.g. Google Inc."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      <input
                        type="text"
                        value={experienceForm.location}
                        onChange={(e) => setExperienceForm({ ...experienceForm, location: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                        placeholder="e.g. Kuala Lumpur, Malaysia"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                      <select
                        value={experienceForm.type}
                        onChange={(e) => setExperienceForm({ ...experienceForm, type: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900 bg-white"
                      >
                        <option value="work">Work Experience</option>
                        <option value="project">Project</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
                      <input
                        type="text"
                        value={experienceForm.startDate}
                        onChange={(e) => setExperienceForm({ ...experienceForm, startDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                        required
                        placeholder="e.g. Jan 2024"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                      <input
                        type="text"
                        value={experienceForm.endDate}
                        onChange={(e) => setExperienceForm({ ...experienceForm, endDate: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                        placeholder="e.g. Present"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      value={experienceForm.description}
                      onChange={(e) => setExperienceForm({ ...experienceForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none text-gray-900"
                      rows="4"
                      required
                      placeholder="Describe your role and achievements..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Technologies (comma-separated)</label>
                    <input
                      type="text"
                      value={experienceForm.technologies}
                      onChange={(e) => setExperienceForm({ ...experienceForm, technologies: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                      placeholder="e.g. React, Node.js, MongoDB"
                    />
                  </div>

                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={experienceForm.order}
                      onChange={(e) => setExperienceForm({ ...experienceForm, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <FaSave className="w-4 h-4" />
                      {editingExperience ? 'Update Experience' : 'Save Experience'}
                    </button>
                    <button
                      type="button"
                      onClick={resetExperienceForm}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
              <h2 className="text-2xl font-arimo font-bold text-gray-900 mb-6">All Experiences</h2>
              
              {experiencesLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                </div>
              ) : experiences.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No experiences yet. Add your first one!</p>
              ) : (
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp._id}
                      className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              exp.type === 'work' 
                                ? 'bg-blue-100 text-blue-700' 
                                : 'bg-green-100 text-green-700'
                            }`}>
                              {exp.type === 'work' ? 'Work' : 'Project'}
                            </span>
                            <span className="text-sm text-gray-500">Order: {exp.order}</span>
                          </div>
                          <h4 className="font-bold text-gray-900 text-lg">{exp.title}</h4>
                          <p className="text-purple-600 font-medium">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.startDate} — {exp.endDate || 'Present'}</p>
                          <p className="text-gray-700 mt-2 line-clamp-2">{exp.description}</p>
                          {exp.technologies && exp.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-2">
                              {exp.technologies.map((tech, i) => (
                                <span key={i} className="px-2 py-0.5 bg-gray-200 text-gray-600 rounded text-xs">
                                  {tech}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditExperience(exp)}
                            className="p-3 text-blue-500 hover:bg-blue-100 rounded-xl transition-colors"
                            title="Edit experience"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteExperience(exp._id)}
                            className="p-3 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                            title="Delete experience"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Blogs Tab */}
        {activeTab === 'blogs' && (
          <div className="space-y-6">
            {!showBlogForm && (
              <button
                onClick={() => setShowBlogForm(true)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-2xl font-arimo font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
              >
                <FaPlus className="w-4 h-4" />
                Add New Blog
              </button>
            )}

            {showBlogForm && (
              <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-arimo font-bold text-gray-900">
                    {editingBlog ? 'Edit Blog' : 'Add New Blog'}
                  </h2>
                  <button
                    onClick={resetBlogForm}
                    className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                </div>

                <form onSubmit={handleBlogSubmit} className="space-y-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blog URL *</label>
                    <input
                      type="url"
                      value={blogForm.url}
                      onChange={(e) => setBlogForm({ ...blogForm, url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                      required
                      placeholder="https://example.com/article"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                      <input
                        type="text"
                        value={blogForm.title}
                        onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                        required
                        placeholder="Article title"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                      <select
                        value={blogForm.category}
                        onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900 bg-white"
                      >
                        <option value="General">General</option>
                        <option value="Technology">Technology</option>
                        <option value="Programming">Programming</option>
                        <option value="Design">Design</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Lifestyle">Lifestyle</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={blogForm.description}
                      onChange={(e) => setBlogForm({ ...blogForm, description: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all resize-none text-gray-900"
                      rows="3"
                      placeholder="Brief description of the article..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Image URL (optional)</label>
                    <input
                      type="url"
                      value={blogForm.imageUrl}
                      onChange={(e) => setBlogForm({ ...blogForm, imageUrl: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                      placeholder="https://example.com/image.jpg"
                    />
                    <p className="text-xs text-gray-500 mt-1">Leave empty to show a gradient placeholder</p>
                  </div>

                  <div className="w-32">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                    <input
                      type="number"
                      value={blogForm.order}
                      onChange={(e) => setBlogForm({ ...blogForm, order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-all text-gray-900"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                    >
                      <FaSave className="w-4 h-4" />
                      {editingBlog ? 'Update Blog' : 'Save Blog'}
                    </button>
                    <button
                      type="button"
                      onClick={resetBlogForm}
                      className="px-6 py-3 bg-gray-100 text-gray-700 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-lg border border-white/20 p-8">
              <h2 className="text-2xl font-arimo font-bold text-gray-900 mb-6">All Blogs</h2>
              
              {blogsLoading ? (
                <div className="flex justify-center py-10">
                  <div className="animate-spin rounded-full h-10 w-10 border-4 border-purple-500 border-t-transparent"></div>
                </div>
              ) : blogs.length === 0 ? (
                <p className="text-center text-gray-500 py-10">No blogs yet. Add your first one!</p>
              ) : (
                <div className="space-y-4">
                  {blogs.map((blog) => (
                    <div
                      key={blog._id}
                      className="bg-gray-50 rounded-2xl p-5 hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex gap-4 flex-1">
                          {blog.imageUrl && (
                            <img
                              src={blog.imageUrl}
                              alt={blog.title}
                              className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                                {blog.category}
                              </span>
                              <span className="text-sm text-gray-500">Order: {blog.order}</span>
                            </div>
                            <h4 className="font-bold text-gray-900 text-lg truncate">{blog.title}</h4>
                            <a
                              href={blog.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 text-sm hover:underline flex items-center gap-1 truncate"
                            >
                              <FaExternalLinkAlt className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">{blog.url}</span>
                            </a>
                            {blog.description && (
                              <p className="text-gray-600 text-sm mt-1 line-clamp-2">{blog.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <button
                            onClick={() => handleEditBlog(blog)}
                            className="p-3 text-blue-500 hover:bg-blue-100 rounded-xl transition-colors"
                            title="Edit blog"
                          >
                            <FaEdit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog._id)}
                            className="p-3 text-red-500 hover:bg-red-100 rounded-xl transition-colors"
                            title="Delete blog"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
