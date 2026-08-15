import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import FieldIcon from '../components/FieldIcon';
import { login } from '../api/auth';
import '../components/Logo.css';
import '../components/AuthShell.css';
import './LoginPage.css';

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);
    try {
      const res = await login({ email, password });
      if (res?.data?.token) {
        const storage = remember ? localStorage : sessionStorage;
        storage.setItem('token', res.data.token);
      }
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page login-page">
      <div className="login-grid">
        <div className="login-showcase">
          <Logo />
          <div className="login-preview">
            <div className="login-preview-nav">
              <span className="active">Home</span>
              <span>Products</span>
              <span>Services</span>
              <span>Contact</span>
            </div>
            <div className="login-preview-stage">
              <div className="login-preview-arch left" />
              <div className="login-preview-arch right" />
              <div className="login-preview-panel">
                <div className="line short" />
                <div className="line" />
                <div className="line" />
                <div className="circle" />
              </div>
            </div>
            <div className="login-preview-caption">
              <strong>MEDUREON OS</strong>
              <span>Intelligent Management for Modern Healthcare Operations</span>
            </div>
          </div>

          <h2 className="login-headline">Intelligent management for modern healthcare operations.</h2>
          <p className="login-subtext">
            Precision-engineered software designed to streamline operations, optimize inventory, and enhance
            care delivery through advanced analytics.
          </p>
        </div>

        <div className="login-panel">
          <div className="auth-card login-card">
            <h1 className="auth-card-title" style={{ textAlign: 'left' }}>Welcome Back</h1>
            <p className="auth-card-subtitle" style={{ textAlign: 'left' }}>
              Access your Medureon management dashboard
            </p>

            <form onSubmit={handleSubmit} noValidate>
              {error && <div className="form-error-banner">{error}</div>}

              <div className="form-field" style={{ marginBottom: 20 }}>
                <label htmlFor="email">Email Address</label>
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

              <div className="form-field" style={{ marginBottom: 12 }}>
                <div className="login-label-row">
                  <label htmlFor="password">Password</label>
                  <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                </div>
                <div className="input-wrap">
                  <FieldIcon name="lock" />
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <label className="checkbox-row" style={{ margin: '10px 0 24px' }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} />
                <span>Remember this terminal</span>
              </label>

              <button type="submit" className="btn-primary mint" disabled={loading}>
                {loading ? 'Signing In…' : 'Sign In to ERP'}
              </button>
            </form>

            <div className="login-divider">
              <span>OR LOGIN WITH</span>
            </div>

            <div className="login-sso-row">
              <button type="button" className="sso-btn">
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23 12.27c0-.8-.07-1.57-.2-2.32H12v4.4h6.18a5.28 5.28 0 0 1-2.29 3.47v2.88h3.7c2.17-2 3.41-4.94 3.41-8.43Z" />
                  <path fill="#34A853" d="M12 23c3.1 0 5.7-1.02 7.6-2.78l-3.7-2.88c-1.03.7-2.35 1.1-3.9 1.1-3 0-5.54-2.02-6.45-4.74H1.73v2.97A11 11 0 0 0 12 23Z" />
                  <path fill="#FBBC05" d="M5.55 13.7A6.6 6.6 0 0 1 5.2 12c0-.6.1-1.17.35-1.7V7.33H1.73A11 11 0 0 0 1 12c0 1.77.42 3.45 1.73 4.67l3.82-2.97Z" />
                  <path fill="#EA4335" d="M12 5.38c1.68 0 3.19.58 4.38 1.71l3.28-3.28C17.7 1.9 15.1 1 12 1 7.7 1 3.98 3.47 1.73 7.33l3.82 2.97C6.46 7.4 9 5.38 12 5.38Z" />
                </svg>
                Google
              </button>
              <button type="button" className="sso-btn">
                <FieldIcon name="user" width="18" height="18" />
                SSO Login
              </button>
            </div>
          </div>

          <p className="auth-switch">
            New branch? <Link to="/register">Contact sales for enterprise setup</Link>
          </p>

          <footer className="auth-footer">
            © {new Date().getFullYear()} Medureon ERP Systems. Precise Care.
            <div className="auth-footer-links">
              <a href="#privacy">Privacy Policy</a>
              <a href="#compliance">Compliance</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
