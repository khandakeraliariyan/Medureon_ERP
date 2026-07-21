import { useState } from 'react';
import AppShell from '../../components/app-shell/AppShell';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './NotificationsPage.css';

const FILTERS = ['All Alerts', 'Low Stock', 'Expiry Alerts', 'Supplier Dues', 'Sales Updates'];

const SUMMARY = [
  { label: 'Critical', value: '04', icon: 'alertTriangle', tone: 'red' },
  { label: 'Stock Alerts', value: '12', icon: 'inventory', tone: 'green' },
  { label: 'Dues', value: '08', icon: 'wallet', tone: 'blue' },
  { label: 'New Sales', value: '42', icon: 'chart', tone: 'green' },
];

const NOTIFICATIONS = [
  {
    tag: 'CRITICAL', tagTone: 'red', time: '2 mins ago', icon: 'alertTriangle',
    title: 'Stock Critical: Insulin Glargine',
    body: 'Current inventory dropped to 2 units. Minimum required threshold is 15. Pending orders for 8 patients today.',
    primary: 'Reorder Now', secondary: 'View Analytics',
  },
  {
    tag: 'WARNING', tagTone: 'amber', time: '45 mins ago', icon: 'calendar',
    title: 'Expiring Soon: Amoxicillin Batch #9921',
    body: 'Batch of 500 capsules expiring in 15 days. Suggested action: Clearance discount or return to supplier.',
    primary: 'Process Return', secondary: 'Update Pricing',
  },
  {
    tag: 'INFO', tagTone: 'blue', time: '2 hours ago', icon: 'wallet',
    title: 'Supplier Due: MediLink Pharma',
    body: 'Invoice INV-2024-001 ($4,250.00) is due tomorrow. Early payment discount of 2% available until EOD.',
    primary: 'Pay Now', secondary: 'Review Invoice',
  },
  {
    tag: 'FOLLOW-UP', tagTone: 'neutral', time: 'Yesterday', icon: 'patients', read: true,
    title: 'Refill Reminder: David Miller',
    body: 'Patient due for monthly refills of Atorvastatin 20mg. SMS notification sent at 09:00 AM.',
    primary: 'Send Reminder', secondary: 'Call Patient',
  },
  {
    tag: 'SALES', tagTone: 'green', time: '3 hours ago', icon: 'cart',
    title: 'New Online Order #8829',
    body: 'Order for 4 items ($124.50) received from HealthPortal. Pending verification for prescription drugs.',
    primary: 'Verify Order',
  },
];

export default function NotificationsPage() {
  const [filter, setFilter] = useState('All Alerts');

  return (
    <AppShell active="Notifications" title="Notification Center" subtitle="Real-time clinical and operational alerts for your pharmacy network." actions={
      <button type="button" className="btn btn-solid"><Icon name="checkCircle" size={16} /> Mark All as Read</button>
    } searchPlaceholder="Search alerts...">
      <div className="stat-grid">
        {SUMMARY.map((s) => (
          <div className="panel notif-summary-card" key={s.label}>
            <div>
              <div className="cell-sub">{s.label}</div>
              <div className="stat-card-value" style={{ marginTop: 6 }}>{s.value}</div>
            </div>
            <span className={`stat-card-icon tone-${s.tone === 'red' ? 'red' : s.tone === 'blue' ? 'blue' : 'mint'}`}>
              <Icon name={s.icon} size={18} />
            </span>
          </div>
        ))}
      </div>

      <div className="notif-filters">
        {FILTERS.map((f) => (
          <button key={f} type="button" className={f === filter ? 'active' : ''} onClick={() => setFilter(f)}>
            {f}
          </button>
        ))}
      </div>

      <div className="notif-list">
        {NOTIFICATIONS.map((n) => (
          <div className={`notif-card tone-${n.tagTone}${n.read ? ' read' : ''}`} key={n.title}>
            <span className={`notif-icon tone-${n.tagTone}`}><Icon name={n.icon} size={18} /></span>
            <div className="notif-body">
              <div className="notif-top">
                <span className={`badge tone-${n.tagTone}`}>{n.tag}</span>
                <span className="cell-sub">{n.time}</span>
              </div>
              <div className="cell-primary" style={{ fontSize: 15.5, margin: '6px 0 4px' }}>{n.title}</div>
              <p className="notif-text">{n.body}</p>
              <div className="notif-actions">
                {n.primary && <button type="button" className="btn btn-solid">{n.primary}</button>}
                {n.secondary && <button type="button" className="btn btn-outline">{n.secondary}</button>}
              </div>
            </div>
            {n.read && <Icon name="checkCircle" size={18} className="notif-read-check" />}
          </div>
        ))}
      </div>

      <a href="#load-more" className="link-cta" style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 20 }}>
        Load earlier notifications <Icon name="chevronDown" size={14} />
      </a>
    </AppShell>
  );
}
