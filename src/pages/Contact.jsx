// 
import React, { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import ElectricBorder from '../components/ElectricBorder'
import { useTheme } from '../context/ThemeContext'
import '../styles/Contact.css'
import contactImage from '../images/contact.webp'

// ─── EmailJS Config ───────────────────────────────────────────────────────────
// 1. Sign up free at https://www.emailjs.com
// 2. Create a service (e.g. Gmail) → get your SERVICE_ID
// 3. Create an email template → get your TEMPLATE_ID
//    Template variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
// 4. Get your PUBLIC_KEY from Account → API Keys
// Replace the placeholders below with your real values:
const EMAILJS_SERVICE_ID  = 'service_2o2u8k5'   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_ups0gnw'  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = '0QgcYmAxLJjtb6X-f'   // e.g. 'abcXYZ123...'
// ─────────────────────────────────────────────────────────────────────────────

const EB_COLORS = { cyber: '#7df9ff', nebula: '#a78bfa', aurora: '#38f9d7', ember: '#ff6b2b', frost: '#3b82f6' }

const Contact = () => {
  const { currentTheme } = useTheme()
  const ebColor = EB_COLORS[currentTheme] || '#7df9ff'
  const ebChaos = currentTheme === 'cyber' ? 0.14 : currentTheme === 'ember' ? 0.1 : 0.06
  const formRef = useRef()
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [status, setStatus] = useState(null) // null | 'sending' | 'success' | 'error'

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <div className="contact" id="con-section">
      <div className="section-header">
        <h3 id="con"><strong>Contact</strong></h3>
        <p className="section-subtitle">Let's build something together</p>
      </div>

      <div className="contact-container">
        <div className="cphoto">
          <img src={contactImage} alt="Contact" />
          <div className="contact-info-overlay">
            <div className="ci-item">
              <i className="fa-solid fa-envelope"></i>
              <span>syedmahroof2002@gmail.com</span>
            </div>
            <div className="ci-item">
              <i className="fa-solid fa-phone"></i>
              <span>+91 7025195638</span>
            </div>
            <div className="ci-item">
              <i className="fa-solid fa-location-dot"></i>
              <span>Muvattupuzha, Kerala, India</span>
            </div>
          </div>
        </div>

        <ElectricBorder 
          className="cform" 
          color={ebColor} 
          speed={1} 
          chaos={ebChaos} 
          thickness={2} 
          style={{ borderRadius: 20 }}
        >
          <form ref={formRef} onSubmit={handleSubmit} noValidate>
            <div className="input-group">
              <i className="fa-solid fa-user"></i>
              <input
                className="cname"
                name="from_name"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-envelope"></i>
              <input
                className="cmail"
                name="from_email"
                type="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-phone"></i>
              <input
                className="cno"
                name="phone"
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-message"></i>
              <textarea
                className="cmess"
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
              ></textarea>
            </div>

            {status === 'success' && (
              <div className="form-status success">
                <i className="fa-solid fa-circle-check"></i>
                Message sent! I'll get back to you soon.
              </div>
            )}
            {status === 'error' && (
              <div className="form-status error">
                <i className="fa-solid fa-circle-exclamation"></i>
                Failed to send. Please email me directly.
              </div>
            )}

            <button className="sub" type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? (
                <><i className="fa-solid fa-spinner fa-spin"></i> Sending...</>
              ) : (
                <><i className="fa-solid fa-paper-plane"></i> Send Message</>
              )}
            </button>
          </form>
        </ElectricBorder>
      </div>
    </div>
  )
}

export default Contact