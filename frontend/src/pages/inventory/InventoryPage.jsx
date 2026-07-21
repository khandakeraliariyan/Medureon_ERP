import AppShell from '../../components/app-shell/AppShell';
import StatCard from '../../components/ui/StatCard';
import Badge from '../../components/ui/Badge';
import Pagination from '../../components/ui/Pagination';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';

const MEDICINES = [
  { name: 'Amoxicillin 500mg', generic: 'Amoxicillin Trihydrate', category: 'Antibiotics', batch: 'AMX-2024-001', stock: '450 Units', status: 'In Stock', tone: 'green', expiry: '12/2025', price: '$12.50' },
  { name: 'Lisinopril 10mg', generic: 'Lisinopril', category: 'Cardiovascular', batch: 'LIS-2023-452', stock: '12 Units', status: 'Low Stock', tone: 'amber', expiry: '08/2024', price: '$8.20' },
  { name: 'Ibuprofen 400mg', generic: 'Ibuprofen', category: 'Analgesics', batch: 'IBU-2022-110', stock: '85 Units', status: 'Expired', tone: 'red', expiry: '01/2024', price: '$4.50' },
  { name: 'Metformin 850mg', generic: 'Metformin Hydrochloride', category: 'Antidiabetic', batch: 'MET-2024-882', stock: '1,200 Units', status: 'In Stock', tone: 'green', expiry: '04/2026', price: '$15.00' },
];

export default function InventoryPage() {
  return (
    <AppShell active="Inventory" title="Inventory Management" subtitle="Manage pharmaceutical stocks, batch details, and pricing compliance." actions={
      <>
        <button type="button" className="btn btn-outline"><Icon name="download" size={16} /> Export CSV</button>
        <button type="button" className="btn btn-solid"><Icon name="plus" size={16} /> Add Product</button>
      </>
    }>
      <div className="stat-grid">
        <StatCard label="Total SKUs" value="1,284" hint="+12 this month" hintTone="good" />
        <StatCard label="Low Stock" value="24" hint="Requires action" hintTone="bad" />
        <StatCard label="Expired Items" value="08" hint="Pending disposal" hintTone="bad" />
        <StatCard label="Inventory Value" value="$42,500 USD" />
      </div>

      <div className="panel">
        <div className="table-toolbar">
          <div className="search-input">
            <Icon name="search" size={16} />
            <input type="text" placeholder="Search by medicine name, generic name, or batch ID..." />
          </div>
          <div className="select-input">All Categories <Icon name="chevronDown" size={14} /></div>
          <div className="select-input">Stock Status <Icon name="chevronDown" size={14} /></div>
          <button type="button" className="btn btn-outline btn-icon"><Icon name="filter" size={16} /></button>
        </div>

        <table className="data-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Generic Name</th>
              <th>Category</th>
              <th>Batch #</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Expiry</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {MEDICINES.map((m) => (
              <tr key={m.batch}>
                <td className="cell-primary">{m.name}</td>
                <td style={{ fontStyle: 'italic' }}>{m.generic}</td>
                <td>{m.category}</td>
                <td>{m.batch}</td>
                <td className="cell-primary">{m.stock}</td>
                <td><Badge tone={m.tone}>{m.status}</Badge></td>
                <td style={{ color: m.tone === 'red' ? '#c0392b' : undefined, fontWeight: m.tone === 'red' ? 700 : 400 }}>{m.expiry}</td>
                <td>{m.price}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="table-footer">
          <span>Showing 1 to 4 of 1,284 medicines</span>
          <Pagination pages={3} />
        </div>
      </div>
    </AppShell>
  );
}
