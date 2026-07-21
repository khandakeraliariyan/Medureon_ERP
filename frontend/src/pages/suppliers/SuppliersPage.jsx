import AppShell from '../../components/app-shell/AppShell';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './SuppliersPage.css';

const SUPPLIERS = [
  { code: 'MT', name: 'MedTech Solutions', id: 'SUP-2024-001', contact: 'Sarah Jenkins', email: 's.jenkins@medtech.com', phone: '+1 (555) 012-3456', due: '$4,500.00', due2: 'Next: Oct 25', status: 'In Stock', tone: 'green' },
  { code: 'GP', name: 'Global Pharma Co.', id: 'SUP-2024-084', contact: 'David Chen', email: 'd.chen@globalpharma.io', phone: '+1 (555) 987-6543', due: '$12,780.45', due2: 'Overdue 4 days', due2Bad: true, status: 'Low Stock', tone: 'red' },
  { code: 'AS', name: 'Apex Supplies Ltd.', id: 'SUP-2024-112', contact: 'Maria Rodriguez', email: 'orders@apexsupplies.com', phone: '+1 (555) 234-5678', due: '$0.00', due2: 'Cleared', status: 'Pending', tone: 'blue' },
];

export default function SuppliersPage() {
  return (
    <AppShell active="Suppliers" title="Supplier Management" subtitle="Centralized database for pharmaceutical vendors and procurement partners." actions={
      <>
        <button type="button" className="btn btn-outline"><Icon name="download" size={16} /> Export Data</button>
        <button type="button" className="btn btn-solid"><Icon name="userPlus" size={16} /> Add New Supplier</button>
      </>
    }>
      <div className="supplier-top-grid">
        <div className="panel supplier-highlight">
          <div className="supplier-highlight-head">
            <div className="supplier-logo-box"><Icon name="shieldLock" size={22} /></div>
            <div>
              <div className="cell-primary" style={{ fontSize: 17 }}>MedTech Solutions</div>
              <div className="cell-sub">Tier 1 Strategic Partner</div>
            </div>
          </div>
          <div className="supplier-highlight-stats">
            <div>
              <div className="cell-sub">Active Orders</div>
              <div className="stat-card-value" style={{ fontSize: 24 }}>12 <span style={{ fontSize: 14, fontWeight: 600 }}>Orders</span></div>
            </div>
            <div>
              <div className="cell-sub">Compliance</div>
              <div className="stat-card-value" style={{ fontSize: 24, color: 'var(--green-700)' }}>98%</div>
            </div>
          </div>
          <div className="supplier-highlight-footer">
            <span className="cell-sub">Last audit: Oct 12, 2023</span>
            <a href="#dossier" className="link-cta">View Dossier <Icon name="chevronRight" size={14} /></a>
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Procurement Health</div>
            <div className="select-input">Last 30 Days <Icon name="chevronDown" size={14} /></div>
          </div>
          <div className="cell-sub">Total Payables</div>
          <div className="stat-card-value" style={{ marginBottom: 4 }}>$248.5k</div>
          <div className="cell-sub" style={{ color: '#c0392b', marginBottom: 16 }}>⚠ $12k Overdue</div>
          <div className="mini-bar-chart">
            {[40, 55, 45, 65, 35, 70].map((v, i) => (
              <div key={i} className={`mini-bar${i === 5 ? ' active' : ''}`} style={{ height: `${v}%` }} />
            ))}
          </div>
        </div>
      </div>

      <div className="panel">
        <div className="panel-header">
          <div className="panel-title">Supplier Directory <Badge tone="neutral">142 Total</Badge></div>
          <div style={{ display: 'flex', gap: 12 }}>
            <div className="search-input" style={{ maxWidth: 240 }}>
              <Icon name="search" size={16} />
              <input type="text" placeholder="Filter by name..." />
            </div>
            <button type="button" className="btn btn-outline btn-icon"><Icon name="filter" size={16} /></button>
          </div>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Company Name</th>
              <th>Contact Person</th>
              <th>Email &amp; Phone</th>
              <th>Due Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {SUPPLIERS.map((s) => (
              <tr key={s.id}>
                <td>
                  <div className="row-with-avatar">
                    <span className="supplier-code-avatar">{s.code}</span>
                    <div>
                      <div className="cell-primary">{s.name}</div>
                      <div className="cell-sub">{s.id}</div>
                    </div>
                  </div>
                </td>
                <td>{s.contact}</td>
                <td>
                  <div>{s.email}</div>
                  <div className="cell-sub">{s.phone}</div>
                </td>
                <td>
                  <div className="cell-primary">{s.due}</div>
                  <div className="cell-sub" style={{ color: s.due2Bad ? '#c0392b' : 'var(--green-700)' }}>{s.due2}</div>
                </td>
                <td><Badge tone={s.tone}>{s.status}</Badge></td>
                <td><button type="button" className="btn btn-outline btn-icon"><Icon name="dots" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Showing 1-10 of 142 suppliers</span>
          <Pagination pages={3} />
        </div>
      </div>
    </AppShell>
  );
}
