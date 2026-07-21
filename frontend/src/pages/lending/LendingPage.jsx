import AppShell from '../../components/app-shell/AppShell';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './LendingPage.css';

const LEDGER = [
  { name: 'Johnathan Doe', code: '#CUST-88122', balance: '$1,240.00', limit: '$5,000.00', due: 'Oct 12, 2024', status: 'Overdue', tone: 'red' },
  { name: 'Alice Smith', code: '#CUST-99041', balance: '$450.00', limit: '$2,000.00', due: 'Oct 28, 2024', status: 'Partial', tone: 'amber' },
  { name: 'Michael Brown', code: '#CUST-44510', balance: '$0.00', limit: '$10,000.00', due: 'Oct 05, 2024', status: 'Paid', tone: 'green' },
  { name: 'Emma Wilson', code: '#CUST-12111', balance: '$2,100.00', limit: '$3,500.00', due: 'Nov 02, 2024', status: 'Pending', tone: 'blue' },
];

const INSTALLMENTS = [
  { name: 'Johnathan Doe', meta: 'Oct 24, 2024 • Receipt #TXN-4021', amount: '+$250.00' },
  { name: 'Sarah Johnson', meta: 'Oct 23, 2024 • Receipt #TXN-3998', amount: '+$1,200.00' },
  { name: 'Unknown Patient', meta: 'Oct 22, 2024 • Receipt #TXN-3850', amount: '+$55.00' },
  { name: 'Alice Smith', meta: 'Oct 20, 2024 • Receipt #TXN-3772', amount: '+$400.00' },
];

export default function LendingPage() {
  return (
    <AppShell active="Lending" title="Lending & Credit Control" subtitle="Monitor outstanding balances and manage patient credit accounts." actions={
      <>
        <button type="button" className="btn btn-mint"><Icon name="mail" size={16} /> Send Reminder</button>
        <button type="button" className="btn btn-solid"><Icon name="creditCard" size={16} /> Record Payment</button>
      </>
    }>
      <div className="stat-grid">
        <StatCard label="Total Credit Issued" value="$245,890.00" icon="creditCard" hint="↗ +12% from last month" hintTone="good" />
        <StatCard label="Overdue Payments" value="$14,240.50" icon="alertTriangle" iconTone="red" hint="28 accounts flagged" hintTone="bad" accent />
        <StatCard label="Recovered this Month" value="$58,300.00" icon="banknote" hint="82% Recovery Rate" hintTone="good" />
        <StatCard label="Upcoming Reminders" value="15" icon="clock" iconTone="blue" hint="Next 48 hours" />
      </div>

      <div className="lending-grid">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Credit Ledger</div>
            <div className="search-input" style={{ maxWidth: 220 }}>
              <Icon name="search" size={16} />
              <input type="text" placeholder="Search customer..." />
            </div>
            <button type="button" className="btn btn-outline btn-icon"><Icon name="filter" size={16} /></button>
          </div>

          <table className="data-table">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Balance</th>
                <th>Limit</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map((l) => (
                <tr key={l.code}>
                  <td>
                    <div className="row-with-avatar">
                      <span className="supplier-code-avatar" style={{ borderRadius: '50%' }}>
                        {l.name.split(' ').map((n) => n[0]).join('')}
                      </span>
                      <div>
                        <div className="cell-primary">{l.name}</div>
                        <div className="cell-sub">{l.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="cell-primary">{l.balance}</td>
                  <td>{l.limit}</td>
                  <td>{l.due}</td>
                  <td><Badge tone={l.tone}>{l.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Installment History</div>
            <Icon name="history" size={18} />
          </div>
          {INSTALLMENTS.map((i, idx) => (
            <div className="installment-row" key={idx}>
              <span className="installment-dot" />
              <div style={{ flex: 1 }}>
                <div className="cell-sub" style={{ marginBottom: 2 }}>Received</div>
                <div className="cell-primary">{i.name}</div>
                <div className="cell-sub">{i.meta}</div>
              </div>
              <span className="installment-amount">{i.amount}</span>
            </div>
          ))}
          <a href="#all-transactions" className="link-cta" style={{ display: 'block', textAlign: 'center', marginTop: 6 }}>
            View All Transactions
          </a>
        </div>
      </div>
    </AppShell>
  );
}
