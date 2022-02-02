import classes from './contact-form.module.css';
import React, { useEffect, useState } from 'react';
import Notification from './ui/notification';  

function ContactForm() {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredName, setEnteredName] = useState('');
  const [enteredMessage, setEnteredMessage] = useState('');
  const [requestStatus, setRequestStatus] = useState(''); // 'pending' , 'success' , 'status'
  const [requestError, setRequestError] = useState('');

  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    let timer;
    if (requestStatus === 'success' || requestStatus === 'error') {
      timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [requestStatus]);
  /* -------------------------------------------------------------------------- */
  async function sendContactData(contactData) {
    const response = await fetch('/api/contact-api', {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }
  }
  /* -------------------------------------------------------------------------- */

  async function sentMessageHandler(event) {
    event.preventDefault();
    setRequestStatus('pending');
    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus('success');
      setEnteredEmail('');
      setEnteredMessage('');
      setEnteredName('');
    } catch (err) {
      setRequestStatus('error');
      setRequestError(err.message);
    }
  }
  /* -------------------------------------------------------------------------- */
  let notification;

  if (requestStatus === 'pending') {
    notification = {
      status: 'pending',
      title: 'Sending message...',
      message: 'Your message is on its way!',
    };
  }

  if (requestStatus === 'success') {
    notification = {
      status: 'success',
      title: 'Success!',
      message: 'Message sent successfully!!!',
    };
  }

  if (requestStatus === 'error') {
    notification = {
      status: 'error',
      title: 'Error!',
      message: requestError,
    };
  }

  /* -------------------------------------------------------------------------- */
  return (
    <section className={classes.contact}>
      <h1>How can i help you?</h1>

      <form className={classes.form} onSubmit={sentMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email"> Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="name"> Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="message"> Your message</label>
            <textarea
              type="text"
              id="message"
              rows="5"
              required
              value={enteredMessage}
              onChange={(event) => setEnteredMessage(event.target.value)}
            />
          </div>
          <div className={classes.control}>
            <button>Send Message</button>
          </div>
        </div>
      </form>
      {notification && (  
        
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
}

export default ContactForm;
