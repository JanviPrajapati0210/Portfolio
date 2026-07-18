import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="page not-found">
      <p className="not-found__code">404</p>
      <h1>Page not found</h1>
      <p>The page you're looking for doesn't exist.</p>
      <Link to="/" className="btn btn--solid" style={{ background: 'var(--accent)' }}>
        Back to home
      </Link>
    </section>
  );
}

export default NotFound;