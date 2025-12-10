'use client';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineBriefcase, HiOutlineCode } from "react-icons/hi";
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Dialog, DialogPanel } from '@headlessui/react';
import './index.css';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blogs', href: '/blogs' },
];

export default function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/experiences');
      const data = await response.json();
      setExperiences(data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredExperiences = activeFilter === 'all' 
    ? experiences 
    : experiences.filter(exp => exp.type === activeFilter);

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

      <title>Experience</title>
      <main className="pt-20 md:pt-24 min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-20">
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-12 mt-4 md:mt-8">
            <h1 className="text-3xl md:text-5xl font-arimo font-bold text-black mb-4 opacity-0 animate-text-reveal">
              Experience & Projects
            </h1>
            <p className="text-base md:text-lg text-gray-700 max-w-2xl mx-auto opacity-0 animate-text-reveal animation-delay-300 px-4">
              A collection of my professional journey and personal projects that showcase my skills and passion for technology.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex justify-center mb-6 md:mb-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-1.5 md:p-2 flex space-x-1 md:space-x-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 md:px-6 py-1.5 md:py-2 rounded-xl font-arimo text-xs md:text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('work')}
                className={`px-3 md:px-6 py-1.5 md:py-2 rounded-xl font-arimo text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                  activeFilter === 'work'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HiOutlineBriefcase className="w-3 h-3 md:w-4 md:h-4" />
                Work
              </button>
              <button
                onClick={() => setActiveFilter('project')}
                className={`px-3 md:px-6 py-1.5 md:py-2 rounded-xl font-arimo text-xs md:text-sm font-medium transition-all duration-300 flex items-center gap-1 md:gap-2 ${
                  activeFilter === 'project'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HiOutlineCode className="w-3 h-3 md:w-4 md:h-4" />
                Projects
              </button>
            </div>
          </div>

          {/* Experience Cards */}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : filteredExperiences.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 md:p-10 max-w-md mx-auto">
                <HiOutlineBriefcase className="w-12 h-12 md:w-16 md:h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg md:text-xl font-arimo font-semibold text-gray-700 mb-2">No experiences yet</h3>
                <p className="text-gray-500 text-sm md:text-base">Check back soon for updates!</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-4 md:gap-6">
              {filteredExperiences.map((exp, index) => (
                <div
                  key={exp._id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4 md:p-6 hover:shadow-purple-200 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 md:gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className={`px-2 md:px-3 py-1 rounded-full text-xs font-medium ${
                            exp.type === 'work' 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {exp.type === 'work' ? 'Work Experience' : 'Project'}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-arimo font-bold text-gray-900 mb-1">{exp.title}</h3>
                        <p className="text-base md:text-lg font-medium text-purple-600 mb-1">{exp.company}</p>
                        {exp.location && (
                          <p className="text-xs md:text-sm text-gray-500 mb-2 md:mb-3">{exp.location}</p>
                        )}
                      </div>
                      
                      {/* Date Badge */}
                      <div className="sm:text-right">
                        <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl text-xs md:text-sm font-medium shadow-md">
                          {exp.startDate} — {exp.endDate || 'Present'}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">{exp.description}</p>
                    
                    {/* Technologies */}
                    {exp.technologies && exp.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 md:gap-2">
                        {exp.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 md:px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs md:text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
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
