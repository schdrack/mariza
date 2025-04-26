'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState('home');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check scroll position for navbar background
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['home', 'projects', 'about', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const Section = ({ id, title, children, className = '' }: { id: string; title: string; children: React.ReactNode; className?: string }) => {
    return (
      <section id={id} className={`py-12 ${className}`}>
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-12 text-center relative">
          {title}
          <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-purple-500 rounded-full"></span>
        </h2>
        {children}
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-600">
      {/* Navbar */}
      <nav className={`fixed w-full z-50 transition-all ${isScrolled ? 'bg-gray-900 bg-opacity-90 backdrop-blur-sm py-2' : 'py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link href="#home" className="text-2xl font-bold text-white">
              Mariza Delice <span className="text-purple-400">.</span>
            </Link>
            
            <div className="hidden md:flex space-x-8">
              {['home', 'projects', 'about', 'contact'].map((item) => (
                <Link
                  key={item}
                  href={`#${item}`}
                  className={`capitalize transition-all ${activeSection === item ? 'text-purple-400 font-medium' : 'text-gray-300 hover:text-white'}`}
                >
                  {item}
                </Link>
              ))}
            </div>

            <button className="md:hidden text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-20">
        {/* Home Section */}
        <Section id="home" title="Welcome to My Portfolio">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-48 h-48 relative">
              <Image
                src="/soso.jpg" // Replace with your profile image
                alt="Profile Picture"
                width={192}
                height={192}
                className="rounded-full object-cover border-4 border-purple-300 shadow-lg"
              />
            </div>
            <div className="flex-1">
            <h2 className="text-2xl font-bold text-white mb-2">Hi, I&apos;m MARIZA Delice</h2>
              <h3 className="text-xl text-purple-200 mb-4">Frontend Developer</h3>
              <p className="text-gray-300">
                I create beautiful, responsive websites with modern technologies. 
                Passionate about user experience and clean code.
              </p>
              <div className="mt-6 flex gap-4">
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-full transition-all">
                  Hire Me
                </button>
                <button className="border border-purple-400 text-purple-200 hover:bg-purple-900 px-6 py-2 rounded-full transition-all">
                  Download CV
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Projects Section */}
        <Section id="projects" title="My Projects" className="mt-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Website",
                description: "A full-featured online store with cart and payment integration.",
                tags: ["React", "Node.js", "MongoDB"],
              },
              {
                title: "Portfolio Template",
                description: "A customizable portfolio template for creatives.",
                tags: ["Next.js", "Tailwind CSS"],
              },
              {
                title: "Task Management App",
                description: "A productivity app for organizing daily tasks.",
                tags: ["React", "Firebase"],
              },
            ].map((project, index) => (
              <div key={index} className="bg-gray-800 bg-opacity-50 rounded-xl p-6 hover:bg-opacity-70 transition-all hover:-translate-y-1">
                <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span key={i} className="bg-purple-900 text-purple-200 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* About Section */}
        <Section id="about" title="About Me" className="mt-20">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">My Skills</h3>
              <div className="space-y-4">
                {[
                  { name: "JavaScript", level: "90%" },
                  { name: "React", level: "85%" },
                  { name: "Next.js", level: "80%" },
                  { name: "Tailwind CSS", level: "95%" },
                  { name: "Node.js", level: "75%" },
                ].map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="text-purple-200">{skill.name}</span>
                      <span className="text-gray-400">{skill.level}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2.5">
                      <div 
                        className="bg-purple-600 h-2.5 rounded-full" 
                        style={{ width: skill.level }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-white mb-4">Experience</h3>
              <div className="space-y-6">
                <div className="border-l-2 border-purple-500 pl-4">
                  <h4 className="text-lg font-medium text-white">Frontend Developer at ABC Corp</h4>
                  <p className="text-purple-300">2025 - Present</p>
                  <p className="text-gray-300 mt-2">
                    Developed responsive web applications using React and Next.js.
                  </p>
                </div>
                <div className="border-l-2 border-purple-500 pl-4">
                  <h4 className="text-lg font-medium text-white">Web Developer Intern at XYZ Inc</h4>
                  <p className="text-purple-300">2020 - 2025</p>
                  <p className="text-gray-300 mt-2">
                    Assisted in building and maintaining company websites.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="contact" title="Contact Me" className="mt-20">
          <div className="max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-purple-200 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-purple-200 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-purple-200 mb-2">Subject</label>
                <input
                  type="text"
                  id="subject"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Subject"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-purple-200 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Your message here..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-lg transition-all w-full md:w-auto"
              >
                Send Message
              </button>
            </form>
            <div className="mt-12 flex flex-wrap justify-center gap-6">
              <a href="#" className="flex items-center gap-2 text-purple-200 hover:text-white">
                <span className="text-2xl">📧</span> marizadelice@gmail.com
              </a>
              <a href="#" className="flex items-center gap-2 text-purple-200 hover:text-white">
                <span className="text-2xl">📱</span> 0791767725
              </a>
              <a href="#" className="flex items-center gap-2 text-purple-200 hover:text-white">
                <span className="text-2xl">📍</span> Kigali Rwanda
              </a>
            </div>
          </div>
        </Section>
      </main>

      <footer className="py-6 text-center text-gray-400 border-t border-gray-800">
        <p>© {new Date().getFullYear()} <h1>Mariza Delice</h1>. All rights reserved.</p>
      </footer>
    </div>
  );
}