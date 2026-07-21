import AppShell from '../../components/app-shell/AppShell';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './DashboardPage.css';

const SALES_TREND = [40, 58, 52, 68, 46, 74, 62];
const MONTHS = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

const TOP_MEDICINES = [
  { name: 'Amoxicillin 500mg', tag: 'Antibiotics · 1,240 units', amount: '$4,820' },
  { name: 'Lisinopril 10mg', tag: 'Hypertension · 980 units', amount: '$3,210' },
  { name: 'Atorvastatin 20mg', tag: 'Cholesterol · 850 units', amount: '$2,940' },
];

const RECENT_SALES = [
  { id: '#PH-9402', patient: 'Johnathan Miller', medicine: 'Metformin 500mg (30)', amount: '$124.50', status: 'Paid' },
  { id: '#PH-9401', patient: 'Clara Oswald', medicine: 'Ventolin Inhaler', amount: '$45.00', status: 'Processing' },
  { id: '#PH-9400', patient: 'Arthur Dent', medicine: 'Paracetamol Pack', amount: '$12.99', status: 'Paid' },
];

const STATUS_TONE = { Paid: 'green', Processing: 'amber' };

export default function DashboardPage() {
  const max = Math.max(...SALES_TREND);

  return (
    <AppShell active="Dashboard" title="Health Hub Dashboard" subtitle="Daily summary of operations for today." actions={
      <>
        <button type="button" className="btn btn-outline"><Icon name="download" size={16} /> Export Report</button>
        <button type="button" className="btn btn-solid"><Icon name="plus" size={16} /> New Sale</button>
      </>
    }>
      <div className="stat-grid">
        <StatCard label="Total Sales" value="$124.5k" icon="banknote" hint="+12%" hintTone="good" />
        <StatCard label="Monthly Revenue" value="$42.8k" icon="chart" hint="+5%" hintTone="good" />
        <StatCard label="Total Profit" value="$18.2k" icon="wallet" hint="-2%" hintTone="bad" />
        <StatCard label="Low Stock Items" value="12" icon="alertTriangle" iconTone="red" hint="Critical" hintTone="bad" accent />
      </div>

      <div className="dash-grid">
        <div className="panel">
          <div className="panel-header">
            <div>
              <div className="panel-title">Sales Performance Trend</div>
              <p className="panel-subtitle">Revenue vs projection for the current quarter</p>
            </div>
            <div className="select-input">Last 6 Months <Icon name="chevronDown" size={14} /></div>
          </div>

          <div className="bar-chart">
            {SALES_TREND.map((v, i) => (
              <div className="bar-col" key={i}>
                <div className={`bar${i === SALES_TREND.length - 1 ? ' active' : ''}`} style={{ height: `${(v / max) * 100}%` }} />
                <span>{MONTHS[i].toUpperCase()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Top Selling Medicines</div>
          </div>
          <div className="top-med-list">
            {TOP_MEDICINES.map((m) => (
              <div className="top-med-row" key={m.name}>
                <span className="top-med-icon"><Icon name="package" size={17} /></span>
                <div className="top-med-info">
                  <div className="cell-primary">{m.name}</div>
                  <div className="cell-sub">{m.tag}</div>
                </div>
                <div className="cell-primary">{m.amount}</div>
              </div>
            ))}
          </div>
          <button type="button" className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
            View All Analytics
          </button>
        </div>
      </div>

      <div className="dash-grid bottom">
        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Recent Sales Transactions</div>
            <Badge tone="green">Real-Time Feed</Badge>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Patient</th>
                <th>Medicine</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {RECENT_SALES.map((s) => (
                <tr key={s.id}>
                  <td className="cell-primary">{s.id}</td>
                  <td>{s.patient}</td>
                  <td>{s.medicine}</td>
                  <td className="cell-primary">{s.amount}</td>
                  <td><Badge tone={STATUS_TONE[s.status]}>{s.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel">
          <div className="panel-header">
            <div className="panel-title">Critical Alerts</div>
          </div>
          <div className="alert-card danger">
            <div className="alert-card-top">
              <Badge tone="red">Low Stock</Badge>
              <span className="cell-sub">2h ago</span>
            </div>
            <div className="cell-primary">Insulin Pen (Human)</div>
            <div className="cell-sub">Remaining: 2 units. Minimum: 15.</div>
            <button type="button" className="btn btn-solid" style={{ marginTop: 12 }}>Reorder Now</button>
          </div>
          <div className="alert-card">
            <div className="alert-card-top">
              <Badge tone="amber">Expiring Soon</Badge>
              <span className="cell-sub">5h ago</span>
            </div>
            <div className="cell-primary">Ciprofloxacin</div>
            <div className="cell-sub">Batch #C920 expires in 14 days.</div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
