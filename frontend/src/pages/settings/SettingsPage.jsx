import { useState } from 'react';
import AppShell from '../../components/app-shell/AppShell';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './SettingsPage.css';

const TABS = [
  { key: 'profile', label: 'Pharmacy Profile', icon: 'building' },
  { key: 'branding', label: 'Branding & Logo', icon: 'palette' },
  { key: 'alerts', label: 'Email & Alerts', icon: 'mail' },
  { key: 'invoice', label: 'Invoice & Tax', icon: 'fileText' },
  { key: 'permissions', label: 'Permissions', icon: 'shieldLock' },
];

export default function SettingsPage() {
  const [tab, setTab] = useState('profile');
  const [form, setForm] = useState({
    name: 'PharmaCore Solutions - Central',
    license: 'RX-990-212-B',
    address: '102 Medical Plaza, Healthcare District, Suite 400, Chicago, IL 60601',
    contact: 'admin@pharmacore.com',
    phone: '+1 (555) 012-3456',
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  return (
    <AppShell active="Settings" title="System Settings" subtitle="Manage your pharmacy ERP configuration, branding, and security preferences." searchPlaceholder="Search settings...">
      <div className="settings-grid">
        <div className="settings-tabs">
          {TABS.map((t) => (
            <button key={t.key} type="button" className={t.key === tab ? 'active' : ''} onClick={() => setTab(t.key)}>
              <Icon name={t.icon} size={17} />
              {t.label}
            </button>
          ))}
        </div>

        <div className="settings-content">
          <div className="panel">
            <div className="panel-header">
              <div>
                <div className="panel-title">Pharmacy Profile</div>
                <p className="panel-subtitle">Update your store&apos;s primary identification and contact details.</p>
              </div>
              <button type="button" className="btn btn-solid">Save Changes</button>
            </div>

            <div className="settings-form-grid">
              <div className="form-field">
                <label>Pharmacy Name</label>
                <input className="plain-input" type="text" value={form.name} onChange={update('name')} />
              </div>
              <div className="form-field">
                <label>License Number</label>
                <input className="plain-input" type="text" value={form.license} onChange={update('license')} />
              </div>
              <div className="form-field" style={{ gridColumn: '1 / -1' }}>
                <label>Store Address</label>
                <textarea className="plain-input" rows={2} value={form.address} onChange={update('address')} />
              </div>
              <div className="form-field">
                <label>Primary Contact</label>
                <input className="plain-input" type="email" value={form.contact} onChange={update('contact')} />
              </div>
              <div className="form-field">
                <label>Phone Number</label>
                <input className="plain-input" type="tel" value={form.phone} onChange={update('phone')} />
              </div>
            </div>
          </div>

          <div className="settings-bottom-grid">
            <div className="panel settings-info-card">
              <div className="settings-info-icon"><Icon name="fileText" size={18} /></div>
              <div className="cell-primary">Storage Usage</div>
              <div className="progress-track" style={{ margin: '10px 0' }}><div className="progress-fill" style={{ width: '65%' }} /></div>
              <div className="cell-sub">16.2 GB of 25 GB used</div>
            </div>
            <div className="panel settings-info-card">
              <div className="settings-info-icon"><Icon name="clock" size={18} /></div>
              <div className="cell-primary">System Update</div>
              <div className="cell-sub" style={{ marginTop: 10 }}>Version 4.2.0-STABLE</div>
              <div className="cell-sub">Last checked: 2 hours ago</div>
            </div>
            <div className="panel settings-info-card">
              <div className="settings-info-icon"><Icon name="help" size={18} /></div>
              <div className="cell-primary">Technical Support</div>
              <div className="cell-sub" style={{ marginTop: 10 }}>Dedicated technical manager assigned.</div>
              <a href="#support" className="link-cta">Contact Support</a>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
