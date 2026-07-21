import Logo from '../../components/Logo';
import Icon from '../../components/Icon';
import '../../components/Logo.css';
import '../../components/ui/ui.css';
import './InvoicePage.css';

const LINE_ITEMS = [
  { name: 'Amoxicillin 500mg Capsules', batch: 'AMX-2401-EXP25', qty: 2, price: 18.5, amount: 37.0 },
  { name: 'Lisinopril 10mg Tablets', batch: 'LSN-9902-EXP26', qty: 1, price: 12.25, amount: 12.25 },
  { name: 'Metformin HCL 500mg ER', batch: 'MET-4412-EXP24', qty: 3, price: 9.0, amount: 27.0 },
  { name: 'Fluticasone Propionate Nasal Spray', batch: 'FLT-0083-EXP25', qty: 1, price: 24.99, amount: 24.99 },
];

export default function InvoicePage() {
  return (
    <div className="invoice-page">
      <header className="invoice-topbar">
        <div className="invoice-topbar-left">
          <span className="invoice-brand">PharmaCore ERP</span>
          <span className="invoice-divider" />
          <span>Invoice INV-2024-00892</span>
        </div>
        <div className="invoice-topbar-actions">
          <button type="button" className="btn btn-outline"><Icon name="print" size={16} /> Print</button>
          <button type="button" className="btn btn-outline"><Icon name="download" size={16} /> Download PDF</button>
          <button type="button" className="btn btn-solid"><Icon name="mail" size={16} /> Send to Customer</button>
        </div>
      </header>

      <main className="invoice-wrap">
        <div className="invoice-sheet">
          <div className="invoice-head">
            <div>
              <Logo />
              <div className="invoice-address">
                Central Medical Plaza, Suite 402<br />
                122 Healthcare Blvd, Metro City<br />
                Phone: +1 (555) 098-4422<br />
                Email: billing@pharmacore-erp.com
              </div>
            </div>
            <div className="invoice-head-right">
              <div className="invoice-title">TAX INVOICE</div>
              <span className="badge tone-green">STATUS: PAID</span>
            </div>
          </div>

          <div className="invoice-meta">
            <div>
              <div className="invoice-meta-label">Bill To</div>
              <div className="cell-primary" style={{ fontSize: 16 }}>Jonathan D. Sterling</div>
              <div className="cell-sub">Patient ID: PH-99283-JD</div>
              <div className="cell-sub">452 Riverside Drive, Apt 4C</div>
              <div className="cell-sub">Old Town District, 10022</div>
              <div className="cell-sub">Contact: (555) 123-4567</div>
            </div>
            <div className="invoice-meta-right">
              <div className="invoice-meta-label">Invoice Details</div>
              <div className="invoice-kv"><span>Invoice Number:</span><strong>INV-2024-00892</strong></div>
              <div className="invoice-kv"><span>Issue Date:</span><strong>Oct 24, 2024</strong></div>
              <div className="invoice-kv"><span>Due Date:</span><strong>Nov 07, 2024</strong></div>
              <div className="invoice-kv"><span>Reference:</span><strong>RX-11029</strong></div>
            </div>
          </div>

          <table className="invoice-table">
            <thead>
              <tr>
                <th>Description &amp; Batch</th>
                <th>Qty</th>
                <th>Unit Price</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {LINE_ITEMS.map((item) => (
                <tr key={item.batch}>
                  <td>
                    <div className="cell-primary">{item.name}</div>
                    <div className="cell-sub">Batch: {item.batch}</div>
                  </td>
                  <td>{item.qty}</td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>${item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="invoice-summary">
            <div className="invoice-notes">
              <div className="invoice-meta-label">Pharmacist Notes</div>
              <p>
                &quot;Complete the full course of Amoxicillin as prescribed. Do not skip doses. Store Metformin in a cool, dry place.&quot;
              </p>
            </div>
            <div className="invoice-totals">
              <div className="totals-row"><span>Subtotal:</span><span>$101.24</span></div>
              <div className="totals-row"><span>Tax (8%):</span><span>$8.10</span></div>
              <div className="totals-row" style={{ color: 'var(--green-700)' }}><span>Discount (Loyalty):</span><span>-$5.00</span></div>
              <div className="totals-row total"><span>Total Amount:</span><span className="invoice-total-amount">$104.34</span></div>
            </div>
          </div>

          <div className="invoice-footer-row">
            <div className="invoice-qr-block">
              <div className="invoice-qr" />
              <div>
                <div className="cell-primary">Thank you for your business!</div>
                <div className="cell-sub">Scan QR to verify prescription authenticity.</div>
              </div>
            </div>
            <div className="invoice-stamp">
              PAID
              <span>24-OCT-2024</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="invoice-page-footer">
        <span>© {new Date().getFullYear()} PharmaCore ERP Systems. Precise Care.</span>
        <div className="invoice-footer-links">
          <a href="#privacy">Privacy Policy</a>
          <a href="#terms">Terms of Service</a>
          <a href="#compliance">Compliance</a>
          <a href="#help">Help Desk</a>
        </div>
      </footer>
    </div>
  );
}
