import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo';
import FieldIcon from '../components/FieldIcon';
import '../components/Logo.css';
import '../components/AuthShell.css';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your registered email address.');
      return;
    }

    setLoading(true);
    // No password-reset endpoint exists on the backend yet;
    // this simply confirms receipt on the client.
    await new Promise((resolve) => setTimeout(resolve, 600));
    setLoading(false);
    setSent(true);
  };

  return (
    <div className="auth-page">
      <main className="auth-main" style={{ flexDirection: 'column', gap: 24 }}>
        <Logo />

        <div className="auth-card auth-card-narrow">
          <div className="reset-icon">
            <FieldIcon name="lock" width="26" height="26" />
          </div>

          <h1 className="auth-card-title">Reset your password</h1>
          <p className="auth-card-subtitle">
            Enter your registered email address and we&apos;ll send you a link to reset your password.
          </p>

          {sent ? (
            <div className="form-success-banner">
              If an account exists for <strong>{email}</strong>, a reset link has been sent.
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate>
              {error && <div className="form-error-banner">{error}</div>}

              <div className="form-field" style={{ marginBottom: 20 }}>
                <label htmlFor="email">Work Email</label>
                <div className="input-wrap">
                  <FieldIcon name="mail" />
                  <input
                    id="email"
                    type="email"
                    placeholder="name@medureon.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary mint" disabled={loading}>
                {loading ? 'Sending…' : 'Send Reset Link →'}
              </button>
            </form>
          )}

          <div className="reset-divider" />

          <Link to="/login" className="back-to-login">← Back to login</Link>
        </div>
      </main>

      <footer className="auth-footer">
        © {new Date().getFullYear()} Medureon ERP Systems. Precise Care.
        <div className="auth-footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#support">Contact Support</a>
        </div>
      </footer>
    </div>
  );
}
