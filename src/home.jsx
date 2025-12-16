'use client';
import { FaFacebookF } from "react-icons/fa";
import { HiArrowSmDown } from "react-icons/hi";
import { FaXTwitter } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { GiGrowth } from "react-icons/gi";
import { FaLinkedinIn } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Dialog, DialogPanel } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { IoLogoGameControllerB } from "react-icons/io";
import { IoIosMail } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";
import { FaSteam } from "react-icons/fa";
import { FaHtml5 } from "react-icons/fa";
import { IoLogoJavascript } from "react-icons/io";
import { FaJava } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { TbBrandCSharp } from "react-icons/tb";
import { GrMysql } from "react-icons/gr";
import { FaFlutter } from "react-icons/fa6";
import { FaDartLang } from "react-icons/fa6";
import { FaPhp } from "react-icons/fa";
import { SiExpress } from "react-icons/si";
import { RiTailwindCssFill } from "react-icons/ri";
import { FaGitAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaNodeJs } from "react-icons/fa";
import { SiAdobephotoshop } from "react-icons/si";
import { SiAdobeillustrator } from "react-icons/si";
import { SiAdobepremierepro } from "react-icons/si";
import { SiAdobexd } from "react-icons/si";
import { HiOutlineCog } from "react-icons/hi";

import "animate.css/animate.min.css";
import './index.css';
import TypewriterText from "./components/TypewriterText.jsx";
import Card from "flyonui/components/card/index.js";
import button from "flyonui/components/button/index.js";
import config from './config.js';
import emailjs from '@emailjs/browser';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blogs', href: '/blogs' },
];

export default function Home() {
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactStatus, setContactStatus] = useState(''); 

  useEffect(() => {
    fetchComments();
  }, []);

  // Handle contact form submission
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      alert('Please fill in all fields');
      return;
    }

    setContactLoading(true);
    setContactStatus('');

    try {
      // EmailJS configuration
      await emailjs.send(
        config.EMAILJS_SERVICE_ID,
        config.EMAILJS_TEMPLATE_ID,
        {
          from_name: contactForm.name,
          from_email: contactForm.email,
          message: contactForm.message,
          to_name: 'Muhammad Fauzan',
        },
        config.EMAILJS_PUBLIC_KEY
      );

      setContactStatus('success');
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Email send failed:', error);
      setContactStatus('error');
    } finally {
      setContactLoading(false);
    }
  };

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${config.API_URL}/api/comments`); 
      const data = await response.json();
      setCommentList(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comments) {
      alert('Please enter your name and comment');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${config.API_URL}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, comments }),
      });

      if (response.ok) {
        setName('');
        setComments('');
        fetchComments();  
      } else {
        alert('Failed to submit comment');
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
      alert('Error submitting comment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-200 min-h-screen relative">
      {}
      <div className="absolute top-6 right-8 z-50 flex-col space-y-4 hidden lg:flex">
        <a
          href="https://www.instagram.com/kewl808"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200"
        >
          <FaInstagram className="w-6 h-6" />
        </a>
        <a
          href="https://www.facebook.com/fgfg.fgfg.395017"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200"
        >
          <FaFacebookF className="w-6 h-6" />
        </a>
        <a
          href="https://x.com/ratedlib"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200"
        >
          <FaXTwitter className="w-6 h-6" />
        </a>
        <a
          href="https://www.linkedin.com/in/muhammad-fauzan-813651356/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200"
        >
          <FaLinkedinIn className="w-6 h-6" />
        </a>
      </div>

      {}
      <div className="absolute top-4 left-4 md:top-6 md:left-8 z-50">
        <img
          className="w-10 h-10 md:w-12 md:h-12 object-contain drop-shadow-md"
          src="/Images/logo.png"
          alt="Logo"
        />
      </div>

      <title>Muhammad Fauzan</title>

      {}
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

      {}
      <button
        className="fixed top-4 right-4 z-50 md:hidden bg-white/80 backdrop-blur-md p-2 rounded-xl shadow-lg"
        onClick={() => setMobileMenuOpen(true)}
      >
        <Bars3Icon className="w-6 h-6 text-gray-900" />
      </button>

      {}
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
              <Link
                to="/admin"
                className="block rounded-lg px-3 py-2 text-base font-semibold text-gray-900 hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
            {}
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
      
      {}
      <Link
        to="/admin"
        className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50 bg-white/80 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg border border-white/20 hover:bg-white hover:scale-110 transition-all duration-300 group"
        title="Admin Panel"
      >
        <HiOutlineCog className="w-5 h-5 md:w-6 md:h-6 text-gray-600 group-hover:text-purple-600 group-hover:rotate-90 transition-all duration-300" />
      </Link>

      {}
      <main className="pt-16 md:pt-20 min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
        <div className="flex flex-col justify-center w-full p-4 md:p-10">
          <div className="flex flex-row justify-center">
            <div className="w-full max-w-3xl items-center bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 pb-6 md:pb-10 mx-2 md:mx-4 hover:shadow-blue-200 transition-shadow duration-300">
              <div className="w-full h-10 md:h-12 bg-gray-200 rounded-t-2xl mb-4 md:mb-6 flex items-center px-3 md:px-4">
                <div className="flex items-center gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full"></div>
                </div>
                <h2 className="ml-3 md:ml-4 font-arimo text-gray-900 text-xs md:text-sm font-medium text-center truncate">
                  Muhammad Fauzan - Portfolio
                </h2>
              </div>
              <div className="flex items-center justify-center mb-4 md:mb-6 px-4">
                <TypewriterText />
              </div>
              <div className="flex items-center justify-center">
                <img
                  className="w-24 h-24 md:w-30 md:h-30 object-cover rounded-full"
                  src="/Images/face.jpg"
                  alt="Profile"
                />
              </div>
              <h1 className="text-3xl md:text-5xl font-arimo text-gray-900 text-center opacity-0 animate-text-reveal mt-5 md:mt-7 px-4">
                Muhammad Fauzan
              </h1>
              <h2 className="text-xl md:text-2xl font-arimo text-gray-900 text-center opacity-0 animate-text-reveal animation-delay-200">
                Software Engineer
              </h2>
              <div className="bg-white backdrop-blur-xs rounded-2xl inset-shadow-xs border border-gray-200 pb-2 mx-4 md:mx-12 lg:mx-20 mt-4 md:mt-5">
                <p className="mt-2 text-base md:text-lg text-gray-700 text-center opacity-0 animate-text-reveal animation-delay-300 px-4">
                  Greetings! I'm Fauzan - a passionate software engineer. <br className="hidden md:block"/>
                   I like to play games, create things, and code stuffs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {}
      <div className="bg-gray-200 pt-12 md:pt-18 px-4">
        <h2 className="text-3xl md:text-4xl font-arimo font-semibold text-gray-900 text-center mt-5">About me</h2>
        <p className="mt-4 text-base md:text-lg text-gray-700 text-center max-w-2xl mx-auto px-4">
          I'm just a normal guy with the ability to use computers. <br className="hidden md:block"/>But, the journey from where I started to where I am now is cool.
        </p>
        
        {}
        <div className="position-relative flex justify-center overflow-x-auto py-4">
          <ul className="timeline overflow-x-auto min-w-max px-4">
            <li>
              <div className="timeline-start font-medium text-gray-900">2011</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Got my <br/>first PC</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start font-medium text-gray-900">2014</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Discovered <br/>Dota 2</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start font-medium text-gray-900">2016</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Discovered <br/>programming</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start font-medium text-gray-900">2019</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Worked as <br/>Graphic Designer</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start font-medium text-gray-900">2020</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Worked as <br/>UI Designer</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start font-medium text-gray-900">2022</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Got into Uni as<br/>SE Student</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start font-medium text-gray-900">2025</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box text-sm">Internship at<br/>Infopro Sdn. Bhd.</div>
            </li>
          </ul>
        </div>

        {}
        <div className="flex flex-col md:flex-row gap-4 pt-7 pb-6 px-4 md:px-10">
          <div className="flex-1 bg-white backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4 hover:shadow-green-200 transition-shadow duration-300">
            <GiGrowth className="w-8 h-8 mx-auto mt-2 text-gray-900 hover:text-green-600 transition-colors duration-200"/>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center my-3">Continuous Learner</h2>
            <p className="text-sm text-gray-700 text-center mb-4">
              I am committed to continuous learning and self-improvement, always seeking to expand my knowledge and skills in the ever-evolving field of technology.
            </p>
          </div>
          <div className="flex-1 bg-white backdrop-blur-md shadow-lg rounded-2xl border border-white/20 p-4 hover:shadow-blue-200 transition-shadow duration-300">
            <RiTeamFill className="w-8 h-8 mx-auto mt-2 text-gray-900 hover:text-blue-600 transition-colors duration-200"/>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center my-3">Team Player</h2>
            <p className="text-sm text-gray-700 text-center mb-4">
              I believe in the power of collaboration and teamwork, always ready to support my colleagues and contribute to a positive and productive work environment.
            </p>
          </div>
          <div className="flex-1 bg-white backdrop-blur-md shadow-lg rounded-2xl border border-white/20 p-4 hover:shadow-red-200 transition-shadow duration-300">
            <IoLogoGameControllerB className="w-8 h-8 mx-auto mt-2 text-gray-900 hover:text-red-600 transition-colors duration-200"/>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900 text-center my-3">Gaming Enthusiast</h2>
            <p className="text-sm text-gray-700 text-center mb-4">
              I am passionate about gaming and enjoy exploring new worlds and challenges through interactive experiences. Gaming fosters creativity and problem-solving skills.
            </p>
          </div>
        </div>

        {}
        <div className="text-center pt-12 md:pt-18 pb-5 px-4">
          <h1 className="font-arimo text-3xl md:text-4xl text-gray-900 font-bold">Skills</h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Here are some of the technical skills and technologies I have worked with:
          </p>
          
          <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 mt-10 max-w-5xl mx-auto">
            {}
            <div>
              <h2 className="text-xl md:text-2xl font-arimo text-gray-900 font-semibold mb-4">Programming Languages</h2>
              <div className="grid grid-cols-4 gap-4 justify-items-center">
                <FaHtml5 className="w-10 h-10 md:w-14 md:h-14 text-html hover:scale-105 transition-transform duration-300" title="HTML5"/>
                <IoLogoJavascript className="w-10 h-10 md:w-14 md:h-14 text-javascriptcol hover:scale-105 transition-transform duration-300" title="JavaScript"/>
                <FaJava className="w-10 h-10 md:w-14 md:h-14 text-blue-400 hover:scale-105 transition-transform duration-300" title="Java"/>
                <TbBrandCSharp className="w-10 h-10 md:w-14 md:h-14 text-purple-400 hover:scale-105 transition-transform duration-300" title="CSharp"/>
                <GrMysql className="w-10 h-10 md:w-14 md:h-14 text-blue-600 hover:scale-105 transition-transform duration-300" title="MySQL"/>
                <FaPhp className="w-10 h-10 md:w-14 md:h-14 text-purple-700 hover:scale-105 transition-transform duration-300" title="PHP"/>
                <FaDartLang className="w-10 h-10 md:w-14 md:h-14 text-blue-500 hover:scale-105 transition-transform duration-300" title="Dart"/>
              </div>
            </div>
            
            {}
            <div className="mt-8 lg:mt-0">
              <h2 className="text-xl md:text-2xl font-arimo text-gray-900 font-semibold mb-4">Frameworks & Technologies</h2>
              <div className="grid grid-cols-4 gap-4 justify-items-center">
                <FaFlutter className="w-10 h-10 md:w-14 md:h-14 text-blue-400 hover:scale-105 transition-transform duration-300" title="Flutter"/>
                <FaReact className="w-10 h-10 md:w-14 md:h-14 text-blue-500 hover:scale-105 transition-transform duration-300" title="React"/>
                <SiExpress className="w-10 h-10 md:w-14 md:h-14 text-black hover:scale-105 transition-transform duration-300" title="Express.js"/>
                <RiTailwindCssFill className="w-10 h-10 md:w-14 md:h-14 text-blue-400 hover:scale-105 transition-transform duration-300" title="TailwindCSS"/>
                <FaGitAlt className="w-10 h-10 md:w-14 md:h-14 text-orange-600 hover:scale-105 transition-transform duration-300" title="Git"/>
                <FaGithub className="w-10 h-10 md:w-14 md:h-14 text-black hover:scale-105 transition-transform duration-300" title="GitHub"/>
                <FaNodeJs className="w-10 h-10 md:w-14 md:h-14 text-green-600 hover:scale-105 transition-transform duration-300" title="Node.js"/>
                <SiAdobephotoshop className="w-10 h-10 md:w-14 md:h-14 text-blue-600 hover:scale-105 transition-transform duration-300" title="Adobe Photoshop"/>
                <SiAdobeillustrator className="w-10 h-10 md:w-14 md:h-14 text-orange-600 hover:scale-105 transition-transform duration-300" title="Adobe Illustrator"/>
                <SiAdobepremierepro className="w-10 h-10 md:w-14 md:h-14 text-purple-600 hover:scale-105 transition-transform duration-300" title="Adobe Premiere Pro"/>
                <SiAdobexd className="w-10 h-10 md:w-14 md:h-14 text-pink-600 hover:scale-105 transition-transform duration-300" title="Adobe XD"/>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="text-center pt-12 md:pt-18 pb-5 px-4">
          <h1 className="font-arimo text-3xl md:text-4xl text-gray-900 font-bold">Experience</h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Some of the companies and organizations I have worked with:
          </p>
          
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 mt-6 md:mt-8 px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl font-arimo font-semibold text-base md:text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Experiences
            <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>

        {}
        <div className="text-center pt-12 md:pt-18 pb-5 px-4">
          <h1 className="font-arimo text-3xl md:text-4xl text-gray-900 font-bold">Contact</h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Feel free to reach out to me via email or social media. <br className="hidden md:block"/>I am open to networking, collaboration, and new opportunities.
          </p>

          <div className="mt-6 bg-gray-300 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 mx-2 md:mx-auto max-w-4xl">
            <div className="flex flex-col md:flex-row gap-6 p-4 md:p-6">
              {}
              <div className="flex-1 flex flex-col items-center space-y-3 md:space-y-4">
                <h3 className="text-lg md:text-xl text-center font-arimo text-gray-900 font-semibold mt-2 mb-2 md:mb-4">
                  Get in Touch!
                </h3>
                <button
                  className="text-gray-900 bg-white backdrop-blur-xs rounded-xl inset-shadow-xs border border-gray-200 w-full max-w-xs px-4 md:px-6 py-2 text-sm transition-all duration-200 hover:bg-gray-300 hover:scale-105"
                  onClick={() => window.location = 'mailto:mdfauzan.2109@gmail.com'}
                >
                  <FaWhatsapp className="inline-block mr-2 w-5 h-5" />
                  WhatsApp
                </button>
                <button
                  className="text-gray-900 bg-white backdrop-blur-xs rounded-xl inset-shadow-xs border border-gray-200 w-full max-w-xs px-4 md:px-6 py-2 text-sm transition-all duration-200 hover:bg-gray-300 hover:scale-105"
                  onClick={() => window.open('https://wa.me/60174304025', '_blank')}
                >
                  <FaSteam className="inline-block mr-2 w-5 h-5" />
                  Steam
                </button>
                <button
                  className="text-gray-900 bg-white backdrop-blur-xs rounded-xl inset-shadow-xs border border-gray-200 w-full max-w-xs px-4 md:px-6 py-2 text-sm transition-all duration-200 hover:bg-gray-300 hover:scale-105"
                  onClick={() => window.open('https://steamcommunity.com/id/getrektpenguin/', '_blank')}
                >
                  <IoIosMail className="inline-block mr-2 w-5 h-5" />
                  mdfauzan.2109@gmail.com
                </button>
              </div>

              {
                
              }
              <div className="flex-1 flex justify-center items-center">
                <div className="w-full max-w-md bg-white backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-4 md:p-6">
                  <form onSubmit={handleContactSubmit} className="flex flex-col space-y-3 md:space-y-4">
                    <input
                      type="text"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your Email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                      required
                    />
                    <textarea
                      placeholder="Your Message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      rows="3"
                      required
                    />
                    <button
                      type="submit"
                      disabled={contactLoading}
                      className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium disabled:bg-blue-300 disabled:cursor-not-allowed"
                    >
                      {contactLoading ? 'Sending...' : 'Send Message'}
                    </button>
                    
                    {}
                    {contactStatus === 'success' && (
                      <p className="text-green-600 text-sm text-center font-medium">
                        ✓ Message sent successfully! I'll get back to you soon.
                      </p>
                    )}
                    {contactStatus === 'error' && (
                      <p className="text-red-600 text-sm text-center font-medium">
                        ✗ Failed to send message. Please try again or email me directly.
                      </p>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        {}
        <div className="text-center pt-12 md:pt-18 pb-5 px-4">
          <h1 className="text-3xl md:text-4xl text-gray-900 font-arimo">Comments</h1>
          <p className="mt-4 text-base md:text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Leave your thoughts on my portfolio website below!
          </p>
        </div>
        
        <div className="mt-6 bg-white backdrop-blur-md rounded-2xl shadow-lg mx-4 md:mx-auto max-w-3xl py-6 md:py-10 px-4 md:px-10">
          <form onSubmit={handleSubmit}>
            <div className="bg-gray-100 rounded-xl h-10 mx-auto mb-3">
              <textarea
                placeholder="Write your name"
                className="text-black w-full px-4 py-2 rounded-lg focus:outline-none resize-none"
                rows="1"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="bg-gray-100 rounded-xl h-auto mx-auto">
              <textarea
                placeholder="Write your comment here..."
                className="text-black w-full px-4 py-4 rounded-lg focus:outline-none resize-none"
                rows="3"
                value={comments}
                onChange={(e) => setComments(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 mx-3 md:mx-5 my-3 md:my-5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
                  disabled={loading}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>
          </form>

          {}
          <div className="mt-6 md:mt-8">
            {loading && <p className="text-center text-gray-700">Loading comments...</p>}
            {!loading && commentList.length === 0 && <p className="text-center text-gray-700">No comments yet. Be the first!</p>}
            {commentList.map((comment) => (
              <div key={comment._id} className="bg-gray-100 rounded-lg p-3 md:p-4 mb-3 md:mb-4 shadow-md">
                <h3 className="font-semibold text-gray-900">{comment.name}</h3>
                <p className="text-gray-700 text-sm md:text-base">{comment.comments}</p>
                <p className="text-xs md:text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {}
        <div className="py-6 bg-gray-300 mt-10">
          <p className="text-center text-black text-sm font-medium">
            © 2025 Muhammad Fauzan. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
