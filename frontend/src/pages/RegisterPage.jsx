import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/Logo';
import FieldIcon from '../components/FieldIcon';
import { registerAccount } from '../api/auth';
import '../components/Logo.css';
import '../components/AuthShell.css';

const ROLES = [
  { value: 'inventory', label: 'Operations', icon: 'building' },
  { value: 'manager', label: 'Manager', icon: 'user' },
  { value: 'admin', label: 'Admin', icon: 'shieldCheck' },
];

const initialForm = {
  name: '',
  pharmacyName: '',
  email: '',
  phone: '',
  role: 'inventory',
  password: '',
  confirmPassword: '',
  agree: false,
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const update = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!form.agree) {
      setError('You must agree to the Terms of Service and Privacy Policy.');
      return;
    }

    setLoading(true);
    try {
      await registerAccount({
        name: form.name,
        email: form.email,
        password: form.password,
        role: form.role,
      });
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <Logo />
        <nav className="auth-topbar-links">
          <a href="#help">Help Center</a>
          <a href="#compliance">Compliance</a>
        </nav>
      </header>

      <main className="auth-main">
        <div className="auth-card">
          <h1 className="auth-card-title">Create Institution Account</h1>
          <p className="auth-card-subtitle">Register your organization for Medureon&apos;s leading ERP system.</p>

          <form onSubmit={handleSubmit} noValidate>
            {error && <div className="form-error-banner">{error}</div>}

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="name">Full Name</label>
                <div className="input-wrap">
                  <FieldIcon name="user" />
                  <input
                    id="name"
                    type="text"
                    placeholder="Dr. Jane Smith"
                    value={form.name}
                    onChange={update('name')}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="pharmacyName">Organization Name</label>
                <div className="input-wrap">
                  <FieldIcon name="building" />
                  <input
                    id="pharmacyName"
                    type="text"
                    placeholder="Medureon Health Group"
                    value={form.pharmacyName}
                    onChange={update('pharmacyName')}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="email">Email Address</label>
                <div className="input-wrap">
                  <FieldIcon name="mail" />
                  <input
                    id="email"
                    type="email"
                    placeholder="admin@medureon.com"
                    value={form.email}
                    onChange={update('email')}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="phone">Phone Number</label>
                <div className="input-wrap">
                  <FieldIcon name="phone" />
                  <input
                    id="phone"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={update('phone')}
                  />
                </div>
              </div>
            </div>

            <div className="form-field" style={{ marginBottom: 20 }}>
              <label>Account Role</label>
              <div className="role-select">
                {ROLES.map((role) => (
                  <button
                    type="button"
                    key={role.value}
                    className={`role-option${form.role === role.value ? ' active' : ''}`}
                    onClick={() => setForm((f) => ({ ...f, role: role.value }))}
                  >
                    <FieldIcon name={role.icon} width="22" height="22" />
                    {role.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-grid">
              <div className="form-field">
                <label htmlFor="password">Password</label>
                <div className="input-wrap">
                  <FieldIcon name="lock" />
                  <input
                    id="password"
                    type="password"
                    placeholder="********"
                    value={form.password}
                    onChange={update('password')}
                    required
                    minLength={6}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-wrap">
                  <FieldIcon name="shieldCheck" />
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="********"
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    required
                  />
                </div>
              </div>
            </div>

            <label className="checkbox-row">
              <input type="checkbox" checked={form.agree} onChange={update('agree')} />
              <span>
                I agree to the <a href="#terms">Terms of Service</a> and <a href="#privacy">Privacy Policy</a>.
              </span>
            </label>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Creating Account…' : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an institution account? <Link to="/login">Login here</Link>
          </p>
        </div>
      </main>

      <footer className="auth-footer">
        © {new Date().getFullYear()} Medureon ERP Systems. Precise Care.
      </footer>
    </div>
  );
}
