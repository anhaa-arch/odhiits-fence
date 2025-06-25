// Contact form component

import { useState } from 'react';

function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    // TODO: submit logic
    alert('Message sent!');
  }

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <input name="name" placeholder="Your name" value={form.name} onChange={handleChange} required />
      <input name="email" placeholder="Your email" value={form.email} onChange={handleChange} required type="email" />
      <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
      <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required rows={4} />
      <button type="submit" style={{ background: '#2e7d32', color: '#fff', border: 'none', padding: 10, borderRadius: 4 }}>Send</button>
    </form>
  );
}

export default ContactForm; 