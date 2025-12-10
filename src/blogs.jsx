'use client';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineExternalLink, HiOutlineBookOpen } from "react-icons/hi";
import './index.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blogs', href: '/blogs' },
];

const categoryColors = {
  'Technology': 'from-blue-500 to-cyan-500',
  'Programming': 'from-purple-500 to-pink-500',
  'Design': 'from-orange-500 to-red-500',
  'Gaming': 'from-green-500 to-emerald-500',
  'Lifestyle': 'from-yellow-500 to-orange-500',
  'General': 'from-gray-500 to-slate-500',
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState(['all']);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/blogs');
      const data = await response.json();
      setBlogs(data);
      
      const uniqueCategories = ['all', ...new Set(data.map(blog => blog.category).filter(Boolean))];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = activeCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === activeCategory);

  const getDomain = (url) => {
    try {
      const domain = new URL(url).hostname.replace('www.', '');
      return domain;
    } catch {
      return url;
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen relative">
      {

      }
      <div className="absolute top-6 right-8 z-50 flex-col space-y-4 hidden md:flex">
        <a href="https://www.instagram.com/kewl808" target="_blank" rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200">
          <FaInstagram className="w-6 h-6" />
        </a>
        <a href="https://www.facebook.com/fgfg.fgfg.395017" target="_blank" rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200">
          <FaFacebookF className="w-6 h-6" />
        </a>
        <a href="https://x.com/ratedlib" target="_blank" rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200">
          <FaXTwitter className="w-6 h-6" />
        </a>
        <a href="www.linkedin.com/in/muhammad-fauzan-346511320" target="_blank" rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200">
          <FaLinkedinIn className="w-6 h-6" />
        </a>
      </div>

      {

      }
      <div className="absolute top-6 left-8 z-50">
        <img className="w-12 h-12 object-contain drop-shadow-md" src="/src/assets/Images/logo.png" alt="Logo" />
      </div>

      {

      }
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 px-8 py-4 w-auto">
        <nav className="flex items-center justify-center space-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-arimo text-gray-900 link-effect"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>

      {

      }
      <title>Blogs</title>
      <main className="pt-24 min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {
          }
          <div className="text-center mb-12 mt-12">
            <h1 className="text-5xl font-arimo font-bold text-black mb-4 opacity-0 animate-text-reveal">
              Reading List & Interests
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto opacity-0 animate-text-reveal animation-delay-300">
              A curated collection of articles, blogs, and resources that inspire me and keep me learning.
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex justify-center mb-10 overflow-x-auto pb-2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-2 flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-5 py-2 rounded-xl font-arimo text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                      activeCategory === category
                        ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'All' : category}
                  </button>
                ))}
              </div>
            </div>
          )}

          {

          }
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-10 max-w-md mx-auto">
                <HiOutlineBookOpen className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-arimo font-semibold text-gray-700 mb-2">No blogs yet</h3>
                <p className="text-gray-500">Check back soon for interesting reads!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBlogs.map((blog, index) => (
                <a
                  key={blog._id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:scale-[1.03] transition-all duration-300 hover:shadow-purple-200 flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {}
                  <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                    {blog.imageUrl ? (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${categoryColors[blog.category] || categoryColors['General']} opacity-80 flex items-center justify-center ${blog.imageUrl ? 'hidden' : 'flex'}`}
                    >
                      <HiOutlineBookOpen className="w-16 h-16 text-white/80" />
                    </div>
                    
                    {}
                    <div className="absolute top-3 left-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm`}>
                        {blog.category || 'General'}
                      </span>
                    </div>

                    {}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-sm">
                        <HiOutlineExternalLink className="w-4 h-4 text-gray-700" />
                      </div>
                    </div>
                  </div>

                  {}
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-lg font-arimo font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h3>
                    {blog.description && (
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                        {blog.description}
                      </p>
                    )}
                    
                    {}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-3 border-t border-gray-100">
                      <div className="w-4 h-4 rounded bg-gray-200 flex items-center justify-center overflow-hidden">
                        <img
                          src={`https://www.google.com/s2/favicons?domain=${getDomain(blog.url)}&sz=16`}
                          alt=""
                          className="w-3 h-3"
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                      <span className="truncate">{getDomain(blog.url)}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </main>

      {}
      <div className="py-6 bg-gray-300">
        <p className="text-center text-black text-sm font-medium">
          © 2025 Muhammad Fauzan. All rights reserved.
        </p>
      </div>
    </div>
  );
}

