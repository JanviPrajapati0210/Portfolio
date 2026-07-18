import { useState } from 'react';

const MAX_LENGTH = 300;

function ContactPage() {
  const [message, setMessage] = useState('');
  const [showHelp, setShowHelp] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thanks! Your message (${message.length} characters) would be sent here.`);
    setMessage('');
  };

  return (
    <section className="page contact-page">
      <h1 className="section__title">05. Contact</h1>
      <p className="contact-page__intro">
        Open to internships, hackathon teams, and interesting side projects.
      </p>

      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="message" className="contact-form__label">
          Message
          <button
            type="button"
            className="contact-form__help-btn"
            onClick={() => setShowHelp((prev) => !prev)}
          >
            {showHelp ? 'Hide tip' : 'Show tip'}
          </button>
        </label>

        {showHelp && (
          <p className="contact-form__help">
            Tip: mention what you're building or the role you're hiring for — it helps me
            reply faster.
          </p>
        )}

        <textarea
          id="message"
          className="contact-form__textarea"
          rows={6}
          maxLength={MAX_LENGTH}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
        />

        <p className="contact-form__count">
          {message.length} / {MAX_LENGTH} characters
        </p>

        <button type="submit" className="btn btn--solid" style={{ background: 'var(--accent)' }}>
          Send message
        </button>
      </form>
    </section>
  );
}

export default ContactPage;