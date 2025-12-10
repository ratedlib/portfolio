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

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Experience', href: '/experience' },
  { name: 'Blogs', href: '/blogs' },
];

export default function Home() {
  // New state for comments
  const [name, setName] = useState('');
  const [comments, setComments] = useState('');
  const [commentList, setCommentList] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all comments on page load
  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/comments'); 
      const data = await response.json();
      setCommentList(data);
    } catch (error) {
      console.error('Failed to fetch comments:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submit (POST new comment)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !comments) {
      alert('Please enter your name and comment');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/comments', {
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
      <div className="absolute top-6 right-8 z-50 flex-col space-y-4 hidden md:flex">
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
          href="www.linkedin.com/in/muhammad-fauzan-346511320"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-900 hover:text-pink-600 transition-colors duration-200"
        >
          <FaLinkedinIn className="w-6 h-6" />
        </a>
      </div>
      <div className="absolute top-6 left-8 z-50">
        <img
          className="w-12 h-12 object-contain drop-shadow-md"
          src="/src/assets/Images/logo.png"
          alt="Logo"
        />
      </div>
      <title>Muhammad Fauzan</title>
      <header className="fixed top-4 left-1/2 transform -translate-x-1/2 z-40 bg-white/30 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 px-8 py-4 w-auto">
        <nav className="flex items-center justify-center space-x-10">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-sm font-arimo text-gray-900 link-effect "
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </header>
      
      {/* Admin Button - Bottom Right */}
      <Link
        to="/admin"
        className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-lg border border-white/20 hover:bg-white hover:scale-110 transition-all duration-300 group"
        title="Admin Panel"
      >
        <HiOutlineCog className="w-6 h-6 text-gray-600 group-hover:text-purple-600 group-hover:rotate-90 transition-all duration-300" />
      </Link>
      <main className="pt-20 min-h-screen bg-gradient-to-tr from-neutral-100 to-slate-500">
        <div className="flex flex-col justify-center w-full p-10">
          <div className="flex flex-row">
            <div className="flex-5 items-center bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 pb-10 mx-50 hover:scale-105 transition-transform duration-300 hover:shadow-blue-200">
              <div className="w-full h-12 bg-gray-200 rounded-t-2xl mb-6 flex items-center px-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full hover:scale-120 transition-transform duration-200"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full hover:scale-120 transition-transform duration-200"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full hover:scale-120 transition-transform duration-200"></div>
                </div>
                <h2 className="ml-4 font-arimo text-gray-900 text-sm font-medium text-center">
                  Muhammad Fauzan - Portfolio
                </h2>
              </div>
              <div className="flex items-center justify-center mb-6">
                <TypewriterText />
              </div>
              <div className="flex items-center justify-center">
              <img
                className=" w-30 h-30 object-cover rounded-full"
                src="/src/assets/Images/pngegg.png"
                alt="Profile"
              />
              </div>
            <h1 className=" text-5xl font-arimo text-gray-900 text-center opacity-0 animate-text-reveal mt-7">
              Muhammad Fauzan
            </h1>
            <h2 className="text-2xl font-arimo text-gray-900 text-center opacity-0 animate-text-reveal animation-delay-200">
              Software Engineer
            </h2>
            <div className="bg-white backdrop-blur-xs rounded-2xl inset-shadow-xs border border-gray-200 pb-2 w-auto mx-50 mt-5">
            <p className="mt-2 text-lg text-gray-700 text-center opacity-0 animate-text-reveal animation-delay-300">
              Greetings! I'm Fauzan - a passionate software engineer.<br/>
              I like to play games, create things, and code stuffs.
            </p>
            </div>
            </div>
          </div>
        </div>
      </main>

      <div className="bg-gray-200 pt-18">
        <h2 className="text-4xl font-arimo font-semibold text-gray-900 text-center mt-5">About me</h2>
        <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto">
          I'm just a normal guy with the ability to use computers. <br/>But, the journey from where I started to where I am now is cool.
        </p>
        <div className="position-relative flex justify-center">
          <ul className="timeline overflow-x-auto">
            <li>
              <div className="timeline-start  font-medium text-gray-900">2011</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Got my <br/>first PC</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start  font-medium text-gray-900">2014</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Addicted to <br/>gaming</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start  font-medium text-gray-900">2016</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Discovered <br/>programming</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start  font-medium text-gray-900">2019</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Worked as <br/>Graphic Designer</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start  font-medium text-gray-900">2020</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Worked as <br/>UI Designer</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start  font-medium text-gray-900">2022</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Got into Uni as a Software <br/> Engineering Student</div>
              <hr className="bg-purple-500"/>
            </li>
            <li>
              <hr className="bg-purple-500"/>
              <div className="timeline-start  font-medium text-gray-900">2025</div>
              <div className="timeline-middle">
                <span className="bg-primary/20 flex size-4.5 items-center justify-center rounded-full">
                  <span className="badge badge-primary size-3 rounded-full p-0"></span>
                </span>
              </div>
              <div className="timeline-end timeline-box">Landed my internship <br/>in Infopro Sdn. Bhd.</div>
            </li>
          </ul>
        </div>  
        <div className="flex flex-row pt-7 pb-6">
          <div className="basis-1/3 bg-white backdrop-blur-md rounded-2xl shadow-lg border border-white/20 w-0.5 ml-10 hover:scale-102 transition-transform duration-300 hover:shadow-green-200 ">
          <GiGrowth className="w-8 h-8 mx-auto mt-3 text-gray-900 hover:text-green-600 transition-colors duration-200 "/>
          <h2 className="text-xl font-semibold text-gray-900 text-center my-3">Continuous Learner</h2>
          <p className="mt-2 text-sm text-gray-700 text-center mx-6 mb-4">
            I am committed to continuous learning <br/>
            and self-improvement, always seeking to <br/>
            expand my knowledge and skills in <br/>the ever-evolving
            field of technology.
          </p>
          </div>
          <div className="basis-1/3 bg-white backdrop-blur-md shadow-lg rounded-2xl border border-white/20 w-0.5 mr-2 ml-2 hover:scale-102 transition-transform duration-300 hover:shadow-blue-200 ">
          <RiTeamFill className="w-8 h-8 mx-auto mt-3 text-gray-900 hover:text-blue-600 transition-colors duration-200 "/>
            <h2 className="text-xl font-semibold text-gray-900 text-center my-3">Team Player</h2>
            <p className="mt-2 text-sm text-gray-700 text-center mx-6 mb-4">
              I believe in the power of collaboration and teamwork, <br/>
              always ready to support my colleagues and contribute to <br/>
              a positive and productive work environment.
            </p>
          </div>
          <div className="basis-1/3 bg-white backdrop-blur-md shadow-lg rounded-2xl border border-white/20 w-0.5 mr-10 hover:scale-102 transition-transform duration-300 hover:shadow-red-200 ">
          <IoLogoGameControllerB className="w-8 h-8 mx-auto mt-3 text-gray-900  hover:text-red-600 transition-colors duration-200 "/>
            <h2 className="text-xl font-semibold text-gray-900 text-center mb-3">Gaming Enthusiast</h2>
            <p className="mt-2 text-sm text-gray-700 text-center mx-6 mb-4">
              I am passionate about gaming and enjoy exploring <br/>
              new worlds and challenges through interactive <br/>
              experiences. I believe that gaming fosters creativity <br/>
              and problem-solving skills.
            </p>
          </div>
          
        </div>

        <div className="text-center pt-18 pb-5">
          <h1 className="font-arimo text-4xl text-gray-900 font-bold">Skills</h1>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Here are some of the technical skills and technologies I have worked with:
          </p>
         <div className="grid grid-cols-2 justify-center mb-4 mx-4 mt-10">
            <div className="mx-10 mb-4">
              <h1 className="text-2xl font-arimo text-gray-900 font-semibold mb-4 ml-20">Programming Languages</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl w-full px-30 ">
              <FaHtml5 className="w-15 h-15 text-html mb-5 hover:scale-105 transition-transform duration-300" title="HTML5"/>
              <IoLogoJavascript className="w-15 h-15 text-javascriptcol mb-5 hover:scale-105 transition-transform duration-300" title="JavaScript"/>
              <FaJava className="w-15 h-15 text-blue-400 mb-5 hover:scale-105 transition-transform duration-300" title="Java"/>
              <TbBrandCSharp className="w-15 h-15 text-purple-400 mb-5 hover:scale-105 transition-transform duration-300" title="CSharp"/>
              <GrMysql className="w-15 h-15 text-blue-600 mb-5 hover:scale-105 transition-transform duration-300" title="MySQL"/>
              <FaPhp className="w-15 h-15 text-purple-700 mb-5 hover:scale-105 transition-transform duration-300" title="PHP"/>
              <FaDartLang className="w-15 h-15 text-blue-500 mb-5 hover:scale-105 transition-transform duration-300" title="Dart"/>
            </div>
              <div className=" mx-10 mb-4 mt-20">
              <h1 className="text-2xl font-arimo text-gray-900 font-semibold mb-4 ml-20">Frameworks & Technologies</h1>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-2xl w-full px-30 mt-20 ">
              <FaFlutter className="w-15 h-15 text-blue-400 mb-5 hover:scale-105 transition-transform duration-300" title="Flutter"/>
              <FaReact className="w-15 h-15 text-blue-500 mb-5 hover:scale-105 transition-transform duration-300" title="React"/>
              <SiExpress className="w-15 h-15 text-black mb-5 hover:scale-105 transition-transform duration-300" title="Express.js"/>
              <RiTailwindCssFill className="w-15 h-15 text-blue-400 mb-5 hover:scale-105 transition-transform duration-300" title="TailwindCSS"/>
              <FaGitAlt className="w-15 h-15 text-orange-600 mb-5 hover:scale-105 transition-transform duration-300" title="Git"/>
              <FaGithub className="w-15 h-15 text-black mb-5 hover:scale-105 transition-transform duration-300" title="GitHub"/>
              <FaNodeJs className="w-15 h-15 text-green-600 mb-5 hover:scale-105 transition-transform duration-300" title="Node.js"/>
              <SiAdobephotoshop className="w-15 h-15 text-blue-600 mb-5 hover:scale-105 transition-transform duration-300" title="Adobe Photoshop"/>
              <SiAdobeillustrator className="w-15 h-15 text-orange-600 mb-5 hover:scale-105 transition-transform duration-300" title="Adobe Illustrator"/>
              <SiAdobepremierepro className="w-15 h-15 text-purple-600 mb-5 hover:scale-105 transition-transform duration-300" title="Adobe Premiere Pro"/>
              <SiAdobexd className="w-15 h-15 text-pink-600 mb-5 hover:scale-105 transition-transform duration-300" title="Adobe XD"/>
            </div>

          </div>
        </div>

        <div className="text-center pt-18 pb-5">
          <h1 className="font-arimo text-4xl text-gray-900 font-bold">Experience</h1>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Some of the companies and organizations I have worked with: <br/>
          </p>
          
          <Link
            to="/experience"
            className="inline-flex items-center gap-2 mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-2xl font-arimo font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Experiences
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>

        </div>
        <div className="text-center pt-18 pb-5">
          <h1 className="font-arimo text-4xl text-gray-900 font-bold">Contact</h1>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto">
            Feel free to reach out to me via email or social media. <br/>I am open to networking, collaboration, and new opportunities.
          </p>

          <div className="space-x-6 mt-6  bg-gray-300 backdrop-blur-md rounded-2xl shadow-lg border border-white/20 mx-50">

            <div className="flex justify-evenly pb-6 mx-10">
            <div className="basis-1/2 flex flex-col items-center space-y-4 my-6">
              <h1 className="text-xl text-center font-arimo text-gray-900 font-semibold mt-2 mb-4">
                Get in Touch!
              </h1>
              <button
                className="text-gray-900 bg-white backdrop-blur-xs rounded-xl inset-shadow-xs border border-gray-200 w-80 px-6 py-2 text-sm transition-all duration-200 hover:bg-gray-300 hover:scale-105"
                onClick={() => window.location = 'mailto:mdfauzan.2109@gmail.com'}
              >
                <FaWhatsapp className="inline-block mr-2 w-5 h-5" />
                WhatsApp
              </button>
              <button
                className="text-gray-900 bg-white backdrop-blur-xs rounded-xl inset-shadow-xs border border-gray-200 w-80 px-6 py-2 text-sm transition-all duration-200 hover:bg-gray-300 hover:scale-105"
                onClick={() => window.open('https://wa.me/60123456789', '_blank')}
              >
                <FaSteam className="inline-block mr-2 w-5 h-5" />
                Steam

              </button>
              <button
                className="text-gray-900 bg-white backdrop-blur-xs rounded-xl inset-shadow-xs border border-gray-200 w-80 px-6 py-2 text-sm transition-all duration-200 hover:bg-gray-300 hover:scale-105"
                onClick={() => window.open('https://steamcommunity.com/id/yourprofile', '_blank')}
              >
                <IoIosMail className="inline-block mr-2 w-5 h-5" />
                mdfauzan.2109@gmail.com

              </button>
            </div>

                <div className="basis-1/2 flex justify-center items-center p-6">
                  <div className="w-full max-w-md bg-white backdrop-blur-md rounded-2xl shadow-lg border border-white/20 p-6">
                    <form className="flex flex-col space-y-4">
                      <input
                        type="text"
                        placeholder="Your Name"
                        className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        
                      />
                      <input
                        type="email"
                        placeholder="Your Email"
                        className="text-black  w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
                        
                      />
                      <textarea
                        placeholder="Your Message"
                        className="text-black  w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                        rows="4"
                      />
                      <button
                        type="submit"
                        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium"
                      >
                        Send Message
                      </button>
                    </form>
                  </div>
                </div>

            </div>
            </div>
        </div>
        <div className="text-center pt-18 pb-5">
          <h1 className="text-4xl text-gray-900 font-arimo">Comments</h1>
          <p className="mt-4 text-lg text-gray-700 text-center max-w-2xl mx-auto">Leave your thoughts on my portfolio website below!</p>
          </div>
          <div className="space-x-6 mt-6  bg-white backdrop-blur-md rounded-2xl shadow-lg mx-60 py-10 px-10">
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
                    className="bg-blue-500 text-white px-4 py-2 mx-5 my-5 rounded-lg hover:bg-blue-600 transition-colors duration-200 font-medium text-sm"
                    disabled={loading}
                  >
                    {loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </div>
            </form>

            {/* Display fetched comments */}
            <div className="mt-8">
              {loading && <p className="text-center text-gray-700">Loading comments...</p>}
              {!loading && commentList.length === 0 && <p className="text-center text-gray-700">No comments yet. Be the first!</p>}
              {commentList.map((comment) => (
                <div key={comment._id} className="bg-gray-100 rounded-lg p-4 mb-4 shadow-md">
                  <h3 className="font-semibold text-gray-900">{comment.name}</h3>
                  <p className="text-gray-700">{comment.comments}</p>
                  <p className="text-sm text-gray-500 mt-2">{new Date(comment.createdAt).toLocaleString()}</p>
                </div>
              ))}
            </div>
          </div>
      <div className="py-6 bg-gray-300 mt-10">
        <p className="text-center text-black text-sm font-medium">
          © 2025 Muhammad Fauzan. All rights reserved.
        </p>
      </div>
    </div>
    </div>
  );
}