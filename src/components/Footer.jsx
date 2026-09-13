function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__links">
        {/* Added mailto: prefix */}
        <a 
  href="https://mail.google.com/mail/?view=cm&fs=1&to=janvip0210@gmail.com" 
  target="_blank" 
  rel="noreferrer" 
  className="footer__link"
>
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 6-10 7L2 6" />
  </svg>
  Email
</a>

        {/* Fixed GitHub URL */}
        <a href="https://github.com/JanviPrajapati0210" target="_blank" rel="noreferrer" className="footer__link">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.17-.02-2.12-3.16.69-3.83-1.34-3.83-1.34-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.52-.29-5.17-1.26-5.17-5.6 0-1.24.44-2.25 1.17-3.04-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.14 1.16a10.9 10.9 0 0 1 5.72 0c2.18-1.47 3.14-1.16 3.14-1.16.62 1.57.23 2.73.11 3.02.73.79 1.17 1.8 1.17 3.04 0 4.35-2.66 5.31-5.19 5.59.41.35.77 1.04.77 2.11 0 1.52-.01 2.75-.01 3.12 0 .3.2.66.79.55 4.52-1.51 7.77-5.76 7.77-10.78C23.02 5.24 18.27.5 12 .5Z" />
          </svg>
          GitHub
        </a>

        {/* Fixed LinkedIn URL */}
        <a href="https://www.linkedin.com/in/janvi-prajapati-607b99322?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="footer__link">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
          </svg>
          LinkedIn
        </a>
      </div>
      <p className="footer__copyright">© {year} Janvi · CSPIT, CHARUSAT · Built with React + Vite</p>
    </footer>
  );
}

export default Footer;