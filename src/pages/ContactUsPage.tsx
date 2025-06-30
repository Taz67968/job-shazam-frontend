import "../app/contact.css";
import { useState, ChangeEvent, FormEvent } from 'react';
import Head from 'next/head';
import { 
  HiOutlineMail, 
  HiOutlinePhone, 
  HiOutlineLocationMarker,
  HiOutlineClock,
  HiOutlineChat,
  HiOutlineShare
} from 'react-icons/hi';
import { 
  FaFacebook, 
  FaTwitter, 
  FaLinkedin, 
  FaInstagram 
} from 'react-icons/fa';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  topic: string;
  message: string;
  helpOptions: string[];
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    topic: '',
    message: '',
    helpOptions: []
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      let updatedOptions = [...formData.helpOptions];
      if (checked) {
        updatedOptions.push(value);
      } else {
        updatedOptions = updatedOptions.filter(option => option !== value);
      }
      setFormData(prev => ({ ...prev, helpOptions: updatedOptions }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      topic: '',
      message: '',
      helpOptions: []
    });
  };

  return (
    <div className="contact-container">
      <Head>
        <title>Contact Us | Solarced</title>
        <meta name="description" content="Reach out to our team for assistance" />
      </Head>

      <header className="contact-header">
        <h1>Get In Touch</h1>
        <p>We're here to help you with any questions or feedback you may have. Reach out today!</p>
      </header>

      <div className="contact-content">
        <div className="contact-info">
          <div className="info-card">
            <h2><HiOutlineMail className="icon" /> Email</h2>
            <p className="muted">For inquiries and support</p>
            <a href="mailto:info@solarced.com">info@solarced.com</a>
          </div>
          
          <div className="info-card">
            <h2><HiOutlinePhone className="icon" /> Phone</h2>
            <p className="muted">Call us for assistance</p>
            <a href="tel:+237679345789">+237 679345789</a>
          </div>
          
          <div className="info-card">
            <h2><HiOutlineLocationMarker className="icon" /> Office</h2>
            <p className="muted">Visit our headquarters</p>
            <address>Cameroon Yaounde Jouvence</address>
          </div>
          
          <div className="info-card">
            <h2><HiOutlineClock className="icon" /> Customer Support</h2>
            <p className="muted">Monday - Friday: 9 AM to 5 PM GMT</p>
          </div>
        </div>
        
        <div className="contact-form-container">
          <div className="form-card">
            <h2>Contact Our Team</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="topic">Inquiry Topic</label>
                <select
                  id="topic"
                  name="topic"
                  value={formData.topic}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Topic...</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Questions</option>
                  <option value="feedback">Feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div className="form-group checkbox-group">
                <label>How can we help? (Select all that apply)</label>
                <div className="checkbox-row">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="helpOptions"
                      value="join"
                      checked={formData.helpOptions.includes('join')}
                      onChange={handleChange}
                    />
                    <span>Join Inquiry</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="helpOptions"
                      value="contact"
                      checked={formData.helpOptions.includes('contact')}
                      onChange={handleChange}
                    />
                    <span>Contact Question</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      name="helpOptions"
                      value="reform"
                      checked={formData.helpOptions.includes('reform')}
                      onChange={handleChange}
                    />
                    <span>Reform Inquiry</span>
                  </label>
                </div>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  placeholder="Write your message here..."
                  required
                ></textarea>
              </div>
              
              <button type="submit" className="submit-btn">
                Send Message
              </button>
            </form>
          </div>
     
          <div className="newsletter-card">
            <div className="newsletter-content">
              <div>
                <h3>Join Our Newsletter</h3>
                <p className="muted">Stay updated with the latest job opportunities and company news</p>
              </div>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Your email"
                />
                <button type="button">Subscribe</button>
              </div>
            </div>
          </div>
          
          <div className="support-cards">
            <div className="support-card">
              <div className="support-icon">
                <HiOutlineChat />
              </div>
              <div>
                <h4>Live Chat Support</h4>
                <p className="muted">Available for immediate assistance</p>
              </div>
            </div>
            
            <div className="support-card">
              <div className="support-icon">
                <HiOutlineShare />
              </div>
              <div>
                <h4>Connect With Us</h4>
                <div className="social-icons">
                  <a href="#"><FaFacebook /></a>
                  <a href="#"><FaTwitter /></a>
                  <a href="#"><FaLinkedin /></a>
                  <a href="#"><FaInstagram /></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="contact-footer">
        <div className="footer-bottom">
          <p>© 2025 Solarced. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}