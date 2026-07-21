import { useState } from 'react';
import AppShell from '../../components/app-shell/AppShell';
import Badge from '../../components/ui/Badge';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './StockInPage.css';

const SUMMARY_ITEMS = [
  { name: 'Amoxicillin 500mg', meta: 'Batch: AX-902 • 100 Units', amount: '$450.00' },
  { name: 'Lisinopril 10mg', meta: 'Batch: LS-110 • 50 Units', amount: '$210.00' },
];

const HISTORY = [
  { po: '#PO-3940', supplier: 'Apex Pharma', items: '12 SKUs', total: '$12,450.00', payment: 'Paid', paymentTone: 'green', status: 'Received', statusTone: 'green' },
  { po: '#PO-3938', supplier: 'MediLink', items: '8 SKUs', total: '$4,820.00', payment: 'Pending', paymentTone: 'amber', status: 'Transit', statusTone: 'blue' },
  { po: '#PO-3935', supplier: 'Global Health', items: '24 SKUs', total: '$32,100.00', payment: 'Partial', paymentTone: 'amber', status: 'Received', statusTone: 'green' },
];

export default function StockInPage() {
  const [paymentStatus, setPaymentStatus] = useState('Paid');

  return (
    <AppShell active="Inventory" title="Stock In Management" subtitle="Efficiently record new purchases and manage supplier arrivals." actions={
      <>
        <button type="button" className="btn btn-outline"><Icon name="download" size={16} /> Export PDF</button>
        <button type="button" className="btn btn-solid"><Icon name="fileText" size={16} /> Complete All Entries</button>
      </>
    }>
      <div className="stockin-grid">
        <div className="stockin-main">
          <div className="panel">
            <div className="panel-header">
              <div className="panel-title"><Icon name="cart" size={18} /> New Purchase Entry</div>
              <Badge tone="neutral">PO-48293</Badge>
            </div>

            <div className="stockin-form-grid">
              <div className="form-field">
                <label>Supplier</label>
                <div className="select-input" style={{ justifyContent: 'space-between' }}>Select Supplier... <Icon name="chevronDown" size={14} /></div>
              </div>
              <div className="form-field">
                <label>Product Name</label>
                <div className="search-input">
                  <Icon name="search" size={16} />
                  <input type="text" placeholder="Search product SKU or name..." />
                </div>
              </div>
              <div className="form-field">
                <label>Quantity</label>
                <input className="plain-input" type="number" placeholder="0" />
              </div>
              <div className="form-field">
                <label>Batch Number</label>
                <input className="plain-input" type="text" placeholder="B-XXXX" />
              </div>
              <div className="form-field">
                <label>Expiry Date</label>
                <input className="plain-input" type="date" />
              </div>
              <div className="form-field">
                <label>Buying Price ($)</label>
                <input className="plain-input" type="number" placeholder="0.00" />
              </div>
            </div>

            <button type="button" className="btn btn-mint" style={{ marginTop: 18 }}>
              <Icon name="plus" size={16} /> Add to Summary
            </button>
          </div>

          <div className="panel">
            <div className="panel-header">
              <div className="panel-title">Searchable Purchase History</div>
              <div className="search-input" style={{ maxWidth: 220 }}>
                <Icon name="search" size={14} />
                <input type="text" placeholder="Filter by PO..." />
              </div>
              <button type="button" className="btn btn-outline btn-icon"><Icon name="filter" size={16} /></button>
            </div>

            <table className="data-table">
              <thead>
                <tr>
                  <th>PO ID</th>
                  <th>Supplier</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {HISTORY.map((h) => (
                  <tr key={h.po}>
                    <td className="cell-primary">{h.po}</td>
                    <td>{h.supplier}</td>
                    <td>{h.items}</td>
                    <td className="cell-primary">{h.total}</td>
                    <td><Badge tone={h.paymentTone}>{h.payment}</Badge></td>
                    <td><Badge tone={h.statusTone}>{h.status}</Badge></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stockin-side">
          <div className="panel purchase-summary">
            <div className="panel-title" style={{ color: '#fff' }}>Purchase Summary</div>
            <p className="ps-subtitle">Reviewing current PO draft</p>

            {SUMMARY_ITEMS.map((item) => (
              <div className="ps-item" key={item.name}>
                <div>
                  <div className="cell-primary" style={{ color: '#fff' }}>{item.name}</div>
                  <div className="ps-item-meta">{item.meta}</div>
                </div>
                <div className="ps-item-right">
                  <span>{item.amount}</span>
                  <Icon name="trash" size={16} />
                </div>
              </div>
            ))}
          </div>

          <div className="panel">
            <div className="totals-row"><span>Subtotal</span><span>$660.00</span></div>
            <div className="totals-row"><span>Tax (5%)</span><span>$33.00</span></div>
            <div className="totals-row total"><span>Total Amount</span><span>$693.00</span></div>

            <div className="form-field" style={{ marginTop: 16 }}>
              <label>Payment Status</label>
              <div className="pill-toggle">
                {['Paid', 'Pending', 'Partial'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={paymentStatus === s ? 'active' : ''}
                    onClick={() => setPaymentStatus(s)}
                  >
                    {s.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="panel">
            <div className="panel-title" style={{ marginBottom: 14 }}>Supplier Insights</div>
            <div className="insight-row">
              <span className="insight-icon"><Icon name="chart" size={18} /></span>
              <div>
                <div className="cell-sub">Top Supplier this month</div>
                <div className="cell-primary">Apex Pharma</div>
                <div className="cell-sub" style={{ color: 'var(--green-700)' }}>+12.4% procurement</div>
              </div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div className="cell-sub" style={{ marginBottom: 6 }}>Stock Coverage Ratio <strong style={{ float: 'right', color: 'var(--ink)' }}>84%</strong></div>
              <div className="progress-track"><div className="progress-fill" style={{ width: '84%' }} /></div>
              <div className="cell-sub" style={{ marginTop: 6 }}>Optimal coverage reached. 16% risk identified in critical SKUs.</div>
            </div>

            <div style={{ marginTop: 18 }}>
              <div className="cell-sub" style={{ marginBottom: 10 }}>Recent Activity</div>
              <div className="activity-row">
                <span className="insight-icon good"><Icon name="checkCircle" size={16} /></span>
                <div>
                  <div className="cell-primary" style={{ fontSize: 13.5 }}>Batch #B-902 Received</div>
                  <div className="cell-sub">32 minutes ago • Warehouse A</div>
                </div>
              </div>
              <div className="activity-row">
                <span className="insight-icon"><Icon name="send" size={16} /></span>
                <div>
                  <div className="cell-primary" style={{ fontSize: 13.5 }}>New PO Sent to MediLink</div>
                  <div className="cell-sub">2 hours ago • Automated Flow</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
