import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await loginUser(email, password);
      navigate('/tasks');
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="section" style={{ maxWidth: '400px', margin: '80px auto' }}>
      <span className="section__title section__title--projects">Log In</span>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '14px', marginTop: '24px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error && <p style={{ color: '#ff6b6b', fontSize: '0.85rem' }}>{error}</p>}
        <button type="submit" className="btn btn--solid" disabled={submitting}>
          {submitting ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      <p style={{ color: 'var(--muted)', marginTop: '18px', fontSize: '0.85rem' }}>
        Don't have an account? <Link to="/register" style={{ color: 'var(--accent)' }}>Register</Link>
      </p>
    </section>
  );
}

const inputStyle = {
  padding: '12px 16px',
  borderRadius: '8px',
  border: '1px solid var(--line)',
  backgroundColor: 'var(--bg-elevated)',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.9rem',
  outline: 'none',
};

export default LoginPage;