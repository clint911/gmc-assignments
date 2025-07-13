// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [activeSection, setActiveSection] = useState('landing');
  const sectionsRef = useRef({
    landing: null,
    about: null,
    services: null,
    portfolio: null,
    contact: null
  });

  // Set up scroll observers
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe each section
    Object.values(sectionsRef.current).forEach(section => {
      if (section) observer.observe(section);
    });

    return () => {
      Object.values(sectionsRef.current).forEach(section => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  // Scroll to section handler
  const scrollToSection = (sectionId) => {
    sectionsRef.current[sectionId].scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo">Minimal Studio</div>
          <ul className="nav-links">
            <li className={activeSection === 'landing' ? 'active' : ''}>
              <button onClick={() => scrollToSection('landing')}>Home</button>
            </li>
            <li className={activeSection === 'about' ? 'active' : ''}>
              <button onClick={() => scrollToSection('about')}>About</button>
            </li>
            <li className={activeSection === 'services' ? 'active' : ''}>
              <button onClick={() => scrollToSection('services')}>Services</button>
            </li>
            <li className={activeSection === 'portfolio' ? 'active' : ''}>
              <button onClick={() => scrollToSection('portfolio')}>Portfolio</button>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <button onClick={() => scrollToSection('contact')}>Contact</button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Sections */}
      <section 
        id="landing" 
        ref={el => sectionsRef.current.landing = el}
        className="section landing"
      >
        <div className="content">
          <h1>Minimal Design, Maximum Impact</h1>
          <p>Creating elegant digital experiences with purpose</p>
          <button 
            className="cta-button"
            onClick={() => scrollToSection('contact')}
          >
            Start a Project
          </button>
        </div>
      </section>

      <section 
        id="about" 
        ref={el => sectionsRef.current.about = el}
        className="section about"
      >
        <div className="content">
          <div className="text-content">
            <h2>About Us</h2>
            <p>We are a team of designers and developers passionate about creating clean, functional digital experiences. Our minimalist approach focuses on what truly matters - solving problems effectively.</p>
            <p>Founded in 2015, we've worked with startups and established brands to create meaningful digital products.</p>
          </div>
          <div className="image-content">
            <div className="image-placeholder" />
            <div className="image-caption">Our team in the studio</div>
          </div>
        </div>
      </section>

      <section 
        id="services" 
        ref={el => sectionsRef.current.services = el}
        className="section services"
      >
        <div className="content">
          <h2>Our Services</h2>
          <div className="services-grid">
            <div className="service-card">
              <h3>UI/UX Design</h3>
              <p>Creating intuitive interfaces with user-centered design principles.</p>
            </div>
            <div className="service-card">
              <h3>Web Development</h3>
              <p>Building performant, accessible websites with modern technologies.</p>
            </div>
            <div className="service-card">
              <h3>Brand Identity</h3>
              <p>Developing cohesive visual systems that communicate your values.</p>
            </div>
          </div>
        </div>
      </section>

      <section 
        id="portfolio" 
        ref={el => sectionsRef.current.portfolio = el}
        className="section portfolio"
      >
        <div className="content">
          <h2>Selected Work</h2>
          <div className="portfolio-grid">
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="portfolio-item">
                <div className="portfolio-image" />
                <div className="portfolio-info">
                  <h3>Project {item}</h3>
                  <p>Client Name / Industry</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section 
        id="contact" 
        ref={el => sectionsRef.current.contact = el}
        className="section contact"
      >
        <div className="content">
          <div className="contact-info">
            <h2>Get in Touch</h2>
            <p>We'd love to hear about your project and how we can help.</p>
            <div className="contact-details">
              <p>hello@minimalstudio.com</p>
              <p>+1 (555) 123-4567</p>
              <p>123 Design Street, Creative City</p>
            </div>
          </div>
          <div className="contact-form">
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" placeholder="Your email" />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea id="message" placeholder="Tell us about your project" rows="4"></textarea>
              </div>
              <button type="submit" className="submit-button">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Minimal Studio. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
      </footer>
    </div>
  );
};

export default App;