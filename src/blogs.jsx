'use client';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineExternalLink, HiOutlineBookOpen } from "react-icons/hi";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
      {/* Social Links - Hidden on mobile */}
      <div className="absolute top-6 right-8 z-50 flex-col space-y-4 hidden lg:flex">
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

      {/* Logo */}
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50">
        <img className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-md" src="/Images/logo.png" alt="Logo" />
      </div>

      {/* Desktop Navigation */}
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 px-4 md:px-8 py-3 md:py-4 hidden md:block">
        <nav className="flex items-center justify-center space-x-6 md:space-x-10">
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

      {/* Mobile Navigation Button */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-white/80 backdrop-blur-md p-2 rounded-xl shadow-lg"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Bars3Icon className="w-6 h-6 text-gray-900" />
      </button>

      {/* Mobile Menu */}
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="md:hidden">
        <div className="fixed inset-0 z-50 bg-black/50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm">
          <div className="flex items-center justify-between">
            <img className="w-10 h-10 object-contain" src="/Images/logo.png" alt="Logo" />
            <button onClick={() => setMobileMenuOpen(false)} className="p-2">
              <XMarkIcon className="h-6 w-6 text-gray-900" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="space-y-2 py-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
            <div className="flex gap-4 pt-4 border-t border-gray-200">
              <a href="https://www.instagram.com/kewl808" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-pink-600">
                <FaInstagram className="w-6 h-6" />
              </a>
              <a href="https://www.facebook.com/fgfg.fgfg.395017" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">
                <FaFacebookF className="w-6 h-6" />
              </a>
              <a href="https://x.com/ratedlib" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-gray-900">
                <FaXTwitter className="w-6 h-6" />
              </a>
              <a href="www.linkedin.com/in/muhammad-fauzan-346511320" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-700">
                <FaLinkedinIn className="w-6 h-6" />
              </a>
            </div>
          </div>
        </DialogPanel>
      </Dialog>

      <title>Blogs</title>
      <main className="pt-20 md:pt-24 min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 mt-4 md:mt-12">
            <h1 className="text-3xl md:text-5xl font-arimo font-bold text-black mb-4 opacity-0 animate-text-reveal">
              Reading List & Interests
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto opacity-0 animate-text-reveal animation-delay-300 px-4">
              A curated collection of articles, blogs, and resources that inspire me and keep me learning.
            </p>
          </div>

          {/* Category Filter */}
          {categories.length > 1 && (
            <div className="flex justify-center mb-6 md:mb-10 overflow-x-auto pb-2 px-2">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-1.5 md:p-2 flex space-x-1 md:space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3 md:px-5 py-1.5 md:py-2 rounded-xl font-arimo text-xs md:text-sm font-medium transition-all duration-300 whitespace-nowrap ${
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

          {/* Blog Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 md:p-10 max-w-md mx-auto">
                <HiOutlineBookOpen className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg md:text-xl font-arimo font-semibold text-gray-700 mb-2">No blogs yet</h3>
                <p className="text-gray-500 text-sm md:text-base">Check back soon for interesting reads!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredBlogs.map((blog, index) => (
                <a
                  key={blog._id}
                  href={blog.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-purple-200 transition-all duration-300 flex flex-col"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Image Preview */}
                  <div className="relative h-40 md:h-48 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
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
                      <HiOutlineBookOpen className="w-12 h-12 md:w-16 md:h-16 text-white/80" />
                    </div>
                    
                    {/* Category Badge */}
                    <div className="absolute top-2 md:top-3 left-2 md:left-3">
                      <span className="px-2 md:px-3 py-1 rounded-full text-xs font-medium bg-white/90 backdrop-blur-sm text-gray-800 shadow-sm">
                        {blog.category || 'General'}
                      </span>
                    </div>

                    {/* External Link Icon */}
                    <div className="absolute top-2 md:top-3 right-2 md:right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="bg-white/90 backdrop-blur-sm rounded-full p-1.5 md:p-2 shadow-sm">
                        <HiOutlineExternalLink className="w-3 h-3 md:w-4 md:h-4 text-gray-700" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 flex-1 flex flex-col">
                    <h3 className="text-base md:text-lg font-arimo font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                      {blog.title}
                    </h3>
                    {blog.description && (
                      <p className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 line-clamp-3 flex-1">
                        {blog.description}
                      </p>
                    )}
                    
                    {/* Domain */}
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-auto pt-2 md:pt-3 border-t border-gray-100">
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

      {/* Footer */}
      <div className="py-6 bg-gray-300">
        <p className="text-center text-black text-sm font-medium">
          © 2025 Muhammad Fauzan. All rights reserved.
        </p>
      </div>
    </div>
  );
}
