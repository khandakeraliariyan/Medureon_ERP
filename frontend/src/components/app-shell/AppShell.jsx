import { Link, useNavigate } from 'react-router-dom';
import Icon from '../Icon';
import './AppShell.css';

const NAV_ITEMS = [
  { to: '/app/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { to: '/app/inventory', label: 'Inventory', icon: 'inventory' },
  { to: '/app/pos', label: 'POS', icon: 'pos' },
  { to: '/app/analytics', label: 'Analytics', icon: 'analytics' },
  { to: '/app/patients', label: 'Patients', icon: 'patients' },
  { to: '/app/lending', label: 'Lending', icon: 'wallet' },
  { to: '/app/suppliers', label: 'Suppliers', icon: 'suppliers' },
  { to: '/app/users', label: 'User Management', icon: 'users' },
];

export default function AppShell({ active, title, subtitle, actions, children, searchPlaceholder = 'Global search...' }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="shell">
      <aside className="shell-sidebar">
        <div>
          <div className="shell-logo">Medureon</div>
          <div className="shell-branch">
            <Icon name="building" size={22} />
            <div>
              <div className="shell-branch-name">Main Branch</div>
              <div className="shell-branch-terminal">Terminal A-102</div>
            </div>
          </div>

          <nav className="shell-nav">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`shell-nav-item${active === item.label ? ' active' : ''}`}
              >
                <Icon name={item.icon} size={19} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="shell-nav-bottom">
          <Link to="/app/settings" className={`shell-nav-item${active === 'Settings' ? ' active' : ''}`}>
            <Icon name="settings" size={19} />
            Settings
          </Link>
          <button type="button" className="shell-nav-item danger" onClick={handleLogout}>
            <Icon name="logout" size={19} />
            Logout
          </button>
        </div>
      </aside>

      <div className="shell-body">
        <header className="shell-topbar">
          <div className="shell-search">
            <Icon name="search" size={17} />
            <input type="text" placeholder={searchPlaceholder} />
          </div>
          <div className="shell-topbar-icons">
            <button type="button" className="icon-btn" aria-label="Notifications" onClick={() => navigate('/app/notifications')}>
              <Icon name="bell" size={19} />
              <span className="icon-dot" />
            </button>
            <button type="button" className="icon-btn" aria-label="Help">
              <Icon name="help" size={19} />
            </button>
            <div className="shell-avatar">A</div>
          </div>
        </header>

        <main className="shell-main">
          {title && (
            <div className="shell-page-head">
              <div>
                <h1>{title}</h1>
                {subtitle && <p>{subtitle}</p>}
              </div>
              {actions && <div className="shell-page-actions">{actions}</div>}
            </div>
          )}

          {children}
        </main>

        <footer className="shell-footer">
          <span className="shell-footer-brand">Medureon</span>
          <span>© {new Date().getFullYear()} Medureon ERP Systems. Precise Care.</span>
          <div className="shell-footer-links">
            <a href="#privacy">Privacy Policy</a>
            <a href="#terms">Terms of Service</a>
            <a href="#compliance">Compliance</a>
            <a href="#help">Help Desk</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
