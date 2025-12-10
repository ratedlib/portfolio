'use client';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineBriefcase, HiOutlineCode } from "react-icons/hi";
import { IoArrowBack } from "react-icons/io5";
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
      {}
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

      {}
      <div className="absolute top-6 left-8 z-50">
        <img className="w-12 h-12 object-contain drop-shadow-md" src="/src/assets/Images/logo.png" alt="Logo" />
      </div>

      {}
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

      {}
      <title>Experience</title>
      <main className="pt-24 min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
        <div className="max-w-6xl mx-auto px-6 pb-20">
          {}
          <div className="text-center mb-12 mt-8">
            <div className="flex items-center justify-center mb-4">
            </div>
            <h1 className="text-5xl font-arimo font-bold text-black mb-4 opacity-0 animate-text-reveal">
              Experience & Projects
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto opacity-0 animate-text-reveal animation-delay-300">
              A collection of my professional journey and personal projects that showcase my skills and passion for technology.
            </p>
          </div>

          {}
          <div className="flex justify-center mb-10">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-2 flex space-x-2">
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-6 py-2 rounded-xl font-arimo text-sm font-medium transition-all duration-300 ${
                  activeFilter === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter('work')}
                className={`px-6 py-2 rounded-xl font-arimo text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === 'work'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HiOutlineBriefcase className="w-4 h-4" />
                Work
              </button>
              <button
                onClick={() => setActiveFilter('project')}
                className={`px-6 py-2 rounded-xl font-arimo text-sm font-medium transition-all duration-300 flex items-center gap-2 ${
                  activeFilter === 'project'
                    ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-md'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <HiOutlineCode className="w-4 h-4" />
                Projects
              </button>
            </div>
          </div>

          {}
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          ) : filteredExperiences.length === 0 ? (
            <div className="text-center py-20">
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-10 max-w-md mx-auto">
                <HiOutlineBriefcase className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-arimo font-semibold text-gray-700 mb-2">No experiences yet</h3>
                <p className="text-gray-500">Check back soon for updates!</p>
              </div>
            </div>
          ) : (
            <div className="grid gap-6">
              {filteredExperiences.map((exp, index) => (
                <div
                  key={exp._id}
                  className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6 hover:scale-[1.02] transition-all duration-300 hover:shadow-purple-200"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          exp.type === 'work' 
                            ? 'bg-blue-100 text-blue-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {exp.type === 'work' ? 'Work Experience' : 'Project'}
                        </span>
                      </div>
                      <h3 className="text-2xl font-arimo font-bold text-gray-900 mb-1">{exp.title}</h3>
                      <p className="text-lg font-medium text-purple-600 mb-1">{exp.company}</p>
                      {exp.location && (
                        <p className="text-sm text-gray-500 mb-3">{exp.location}</p>
                      )}
                      <p className="text-gray-700 leading-relaxed mb-4">{exp.description}</p>
                      
                      {}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-purple-100 hover:text-purple-700 transition-colors"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    
                    {}
                    <div className="md:text-right">
                      <div className="inline-block bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-xl text-sm font-medium shadow-md">
                        {exp.startDate} — {exp.endDate || 'Present'}
                      </div>
                    </div>
                  </div>
                </div>
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

