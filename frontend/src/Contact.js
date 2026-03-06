import React, { useState } from 'react';
import './Contact.css';

function Contact({ onClose }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (!name || !email || !message) {
      alert('Please fill in all fields!');
      return;
    }
    alert(`Thank you ${name}! Your message has been sent.`);
    onClose();
  };

  return (
    <div className="contact-overlay">
      <div className="contact-box">
        <button className="close-btn" onClick={onClose}>✕</button>
        <h2>Contact Us 📩</h2>

        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={5}
        />

        <button className="submit-btn" onClick={handleSubmit}>
          Send Message 📨
        </button>
      </div>
    </div>
  );
}

export default Contact;