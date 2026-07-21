import AppShell from '../../components/app-shell/AppShell';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './UserManagementPage.css';

const USERS = [
  { name: 'Felix Henderson', email: 'f.henderson@pharmacore.com', role: 'ADMIN', tone: 'green', active: true, login: 'Oct 24, 2024 · 10:24 AM' },
  { name: 'Sarah Jenkins', email: 's.jenkins@pharmacore.com', role: 'CASHIER', tone: 'blue', active: true, login: 'Oct 23, 2024 · 04:12 PM' },
  { name: 'Marcus Thorne', email: 'm.thorne@pharmacore.com', role: 'INVENTORY', tone: 'blue', active: false, login: 'Sep 12, 2024 · 09:00 AM' },
];

export default function UserManagementPage() {
  return (
    <AppShell active="User Management" title="User Management" subtitle="Manage staff access levels, roles, and account statuses for PharmaCore ERP." actions={
      <button type="button" className="btn btn-solid"><Icon name="userPlus" size={16} /> Add New User</button>
    }>
      <div className="stat-grid">
        <StatCard label="Total Users" value="24" hint="+2 this month" hintTone="good" />
        <StatCard label="Active Sessions" value="12 •" />
        <StatCard label="Admin Roles" value="4" />
        <StatCard label="System Health" value="99.9%" />
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <div className="search-input">
            <Icon name="search" size={16} />
            <input type="text" placeholder="Search by name, email..." />
          </div>
          <div className="select-input"><Icon name="filter" size={14} /> All Roles</div>
          <button type="button" className="btn btn-outline" style={{ marginLeft: 'auto' }}><Icon name="download" size={16} /> Export</button>
          <button type="button" className="btn btn-outline btn-icon"><Icon name="print" size={16} /></button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>User Details</th>
              <th>Role</th>
              <th>Status</th>
              <th>Last Login</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {USERS.map((u) => (
              <tr key={u.email}>
                <td>
                  <div className="row-with-avatar">
                    <span className="supplier-code-avatar" style={{ borderRadius: '50%' }}>
                      {u.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <div>
                      <div className="cell-primary">{u.name}</div>
                      <div className="cell-sub">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td><Badge tone={u.tone}>{u.role}</Badge></td>
                <td>
                  <div className="status-toggle-cell">
                    <span className={`toggle-switch${u.active ? ' on' : ''}`} />
                    <span className={u.active ? 'cell-primary' : 'cell-sub'}>{u.active ? 'Active' : 'Inactive'}</span>
                  </div>
                </td>
                <td className="cell-sub">{u.login}</td>
                <td><button type="button" className="btn btn-outline btn-icon"><Icon name="dots" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Showing 3 of 24 users</span>
          <Pagination pages={3} />
        </div>
      </div>
    </AppShell>
  );
}
