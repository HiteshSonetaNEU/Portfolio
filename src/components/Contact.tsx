import React, { useRef, useState } from 'react';
import '../assets/styles/Contact.scss';
import emailjs from '@emailjs/browser';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';

function Contact() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const [nameError, setNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [messageError, setMessageError] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitMessage, setSubmitMessage] = useState<string>('');

  const form = useRef<HTMLFormElement>(null);

  const sendEmail = (e: any) => {
    e.preventDefault();

    setNameError(name === '');
    setEmailError(email === '');
    setMessageError(message === '');

    if (name !== '' && email !== '' && message !== '') {
      setIsSubmitting(true);
      setSubmitMessage('');

      // EmailJS configuration
      const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || 'service_portfolio';
      const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'template_portfolio';
      const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key';

      const templateParams = {
        from_name: name,
        from_email: email,
        message: message,
        to_name: 'Hitesh Soneta',
        to_email: 'sonetah@gmail.com',
      };

      emailjs.send(serviceId, templateId, templateParams, publicKey)
        .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          setIsSubmitting(false);
          setSubmitMessage('✅ Message sent successfully! I\'ll get back to you soon.');
          
          // Clear the form
          setName('');
          setEmail('');
          setMessage('');
          
          // Clear success message after 5 seconds
          setTimeout(() => {
            setSubmitMessage('');
          }, 5000);
        })
        .catch((error) => {
          console.error('FAILED...', error);
          setIsSubmitting(false);
          
          // Fallback to mailto if EmailJS fails
          const subject = `Portfolio Contact from ${name}`;
          const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
          const mailtoLink = `mailto:sonetah@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
          
          const link = document.createElement('a');
          link.href = mailtoLink;
          link.click();
          
          setSubmitMessage('📧 Opened your email client as backup. Please send the email to complete your message.');
          
          // Clear form and message after delay
          setTimeout(() => {
            setName('');
            setEmail('');
            setMessage('');
            setSubmitMessage('');
          }, 5000);
        });
    }
  };

  return (
    <div id="contact">
      <div className="items-container">
        <div className="contact_wrapper">
          <h1>Contact Me</h1>
          <p>Got a project waiting to be realized? Let's collaborate and make it happen!</p>
          <form
            ref={form}
            noValidate
            autoComplete="off"
            className='contact-form'
            onSubmit={sendEmail}
          >
            <div className='form-flex'>
              <TextField
                required
                id="name-field"
                label="Your Name"
                placeholder="What's your name?"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                error={nameError}
                helperText={nameError ? "Please enter your name" : ""}
                variant="outlined"
                fullWidth
                className="contact-input"
              />
              <TextField
                required
                id="email-field"
                label="Email / Phone"
                placeholder="How can I reach you?"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                error={emailError}
                helperText={emailError ? "Please enter your email or phone number" : ""}
                variant="outlined"
                fullWidth
                className="contact-input"
              />
            </div>
            <TextField
              required
              id="message-field"
              label="Message"
              placeholder="Send me any inquiries or questions"
              multiline
              rows={10}
              className="contact-input body-form"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              error={messageError}
              helperText={messageError ? "Please enter the message" : ""}
              variant="outlined"
              fullWidth
            />
            <Button 
              type="submit"
              variant="contained" 
              endIcon={<SendIcon />} 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send'}
            </Button>
            {submitMessage && (
              <div className="submit-message" style={{ marginTop: '16px', color: '#4caf50', textAlign: 'center' }}>
                {submitMessage}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Contact;