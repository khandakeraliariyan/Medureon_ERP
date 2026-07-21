import AppShell from '../../components/app-shell/AppShell';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';

const CUSTOMERS = [
  { name: 'Julian Henderson', id: 'PC-8921', email: 'j.henderson@mail.com', phone: '+1 (555) 012-3456', visit: 'Oct 24, 2023', status: 'Credit', tone: 'green', spent: '$4,210.50', balance: '$240.00', balanceBad: true },
  { name: 'Elena Rodriguez', id: 'PC-4432', email: 'elena.r@cloud.net', phone: '+1 (555) 789-0123', visit: 'Nov 02, 2023', status: 'Regular', tone: 'blue', spent: '$1,120.00', balance: '$0.00' },
  { name: 'Marcus Thorne', id: 'PC-9011', email: 'm.thorne@global.com', phone: '+1 (555) 456-7890', visit: 'Oct 15, 2023', status: 'Inactive', tone: 'red', spent: '$12,450.00', balance: '$0.00' },
];

export default function CustomersPage() {
  return (
    <AppShell active="Patients" title="Customer Management" subtitle="Manage patient profiles, credit limits, and purchase histories." actions={
      <button type="button" className="btn btn-solid"><Icon name="userPlus" size={16} /> Add New Customer</button>
    }>
      <div className="stat-grid">
        <StatCard label="Total Customers" value="4,281" icon="users" hint="↗ 12% from last month" hintTone="good" />
        <StatCard label="Active Credit Users" value="892" icon="creditCard" hint="21% of total base" />
        <StatCard label="Outstanding Balance" value="$24,102" icon="wallet" iconTone="red" hint="⚠ 8 accounts overdue" hintTone="bad" />
        <StatCard label="Avg. Customer Value" value="$1,450" icon="banknote" iconTone="blue" hint="LTV per active patient" />
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <div className="select-input">Filter by Status <Icon name="chevronDown" size={14} /></div>
          <span className="cell-sub">Showing 10 of 4,281 patients</span>
          <button type="button" className="btn btn-outline" style={{ marginLeft: 'auto' }}><Icon name="download" size={16} /> Export</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Customer Name</th>
              <th>Contact Info</th>
              <th>Last Visit</th>
              <th>Status</th>
              <th>Total Spent</th>
              <th>Balance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {CUSTOMERS.map((c) => (
              <tr key={c.id}>
                <td>
                  <div className="row-with-avatar">
                    <span className="supplier-code-avatar" style={{ borderRadius: '50%' }}>
                      {c.name.split(' ').map((n) => n[0]).join('')}
                    </span>
                    <div>
                      <div className="cell-primary">{c.name}</div>
                      <div className="cell-sub">ID: {c.id}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <div>{c.email}</div>
                  <div className="cell-sub">{c.phone}</div>
                </td>
                <td>{c.visit}</td>
                <td><Badge tone={c.tone}>{c.status}</Badge></td>
                <td className="cell-primary">{c.spent}</td>
                <td className="cell-primary" style={{ color: c.balanceBad ? '#c0392b' : 'var(--green-700)' }}>{c.balance}</td>
                <td><button type="button" className="btn btn-outline btn-icon"><Icon name="dots" size={16} /></button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Showing 1 to 10 of 4,281 entries</span>
          <Pagination pages={3} />
        </div>
      </div>
    </AppShell>
  );
}
