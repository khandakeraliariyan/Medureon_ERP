import AppShell from '../../components/app-shell/AppShell';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './SalesHistoryPage.css';

const ORDERS = [
  { id: '#PH-2024-8901', customer: 'Alex Thompson', customerId: '4492-BX', date: 'Oct 14, 10:24 AM', items: 'Amoxicillin (x2)', more: '+1 more', total: '$142.00', status: 'Paid', tone: 'green' },
  { id: '#PH-2024-8902', customer: 'Maria Garcia', customerId: '1022-LC', date: 'Oct 14, 09:45 AM', items: 'Lisinopril (x1)', total: '$45.10', status: 'Refunded', tone: 'red' },
  { id: '#PH-2024-8903', customer: 'Samuel Wright', customerId: 'Walk-in Customer', date: 'Oct 14, 09:12 AM', items: 'Ibuprofen (x3)', more: '+3 more', total: '$28.45', status: 'Paid', tone: 'green' },
  { id: '#PH-2024-8904', customer: 'Jessica Miller', customerId: '8821-AM', date: 'Oct 13, 05:55 PM', items: 'Ventolin Inhaler', total: '$92.00', status: 'Paid', tone: 'green' },
];

export default function SalesHistoryPage() {
  return (
    <AppShell active="Analytics" title="Sales History" subtitle="Review transaction records and payment performance.">
      <div className="stat-grid three">
        <div className="panel">
          <div className="cell-sub">Daily Sales</div>
          <div className="stat-card-value" style={{ margin: '10px 0' }}>$12,482.90</div>
          <div className="stat-card-hint tone-good">+12.4% vs yesterday</div>
        </div>
        <div className="panel">
          <div className="cell-sub">Avg. Order Value</div>
          <div className="stat-card-value" style={{ margin: '10px 0' }}>$84.50</div>
          <div className="stat-card-hint tone-good">+3.1% avg transaction growth</div>
        </div>
        <div className="panel">
          <div className="cell-sub" style={{ marginBottom: 14 }}>Payment Distribution</div>
          <div className="payment-dist-row">
            <span className="dot green" /> Credit Card <strong>68%</strong>
          </div>
          <div className="progress-track"><div className="progress-fill" style={{ width: '68%' }} /></div>
          <div className="payment-dist-row" style={{ marginTop: 12 }}>
            <span className="dot blue" /> Cash / Insurance <strong>32%</strong>
          </div>
          <div className="progress-track"><div className="progress-fill blue" style={{ width: '32%' }} /></div>
        </div>
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <div className="search-input">
            <Icon name="search" size={16} />
            <input type="text" placeholder="Search invoices, customers..." />
          </div>
          <div className="select-input"><Icon name="calendar" size={14} /> Oct 01, 2024 - Oct 14, 2024</div>
          <div className="select-input">All Statuses <Icon name="chevronDown" size={14} /></div>
          <button type="button" className="btn btn-outline"><Icon name="download" size={16} /> Export CSV</button>
          <button type="button" className="btn btn-solid"><Icon name="fileText" size={16} /> Report PDF</button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date &amp; Time</th>
              <th>Items Sold</th>
              <th>Total</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {ORDERS.map((o) => (
              <tr key={o.id}>
                <td className="cell-primary" style={{ color: 'var(--green-700)' }}>{o.id}</td>
                <td>
                  <div className="cell-primary">{o.customer}</div>
                  <div className="cell-sub">{o.customerId.startsWith('Walk') ? o.customerId : `ID: ${o.customerId}`}</div>
                </td>
                <td>{o.date}</td>
                <td>
                  <Badge tone="blue">{o.items}</Badge>
                  {o.more && <div className="cell-sub" style={{ marginTop: 4 }}>{o.more}</div>}
                </td>
                <td className="cell-primary">{o.total}</td>
                <td><Badge tone={o.tone}>{o.status}</Badge></td>
                <td><button type="button" className="btn btn-outline">View Invoice</button></td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Showing 1-10 of 482 transactions</span>
          <Pagination pages={3} />
        </div>
      </div>
    </AppShell>
  );
}
