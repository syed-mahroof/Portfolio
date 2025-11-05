import React, { useState } from 'react'
import '../styles/Contact.css'
import contactImage from '../images/contact.webp'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Add your form submission logic here
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  return (
    <div className="contact" id="con-section">
      <h3 id="con"><strong>Contact</strong></h3>
      <div className="contact-container">
        <div className="cphoto">
          <img src={contactImage} alt="Contact" />
        </div>
        <div className="cform">
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <i className="fa-solid fa-user"></i>
              <input
                className="cname"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-envelope"></i>
              <input
                className="cmail"
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-phone"></i>
              <input
                className="cno"
                name="phone"
                type="tel"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <i className="fa-solid fa-message"></i>
              <textarea
                className="cmess"
                name="message"
                placeholder="Message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <input className="sub" type="submit" value="Submit" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact