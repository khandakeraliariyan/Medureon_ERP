import { useState } from 'react';
import AppShell from '../../components/app-shell/AppShell';
import Icon from '../../components/Icon';
import '../../components/ui/ui.css';
import './POSPage.css';

const CATEGORIES = ['All Medicines', 'Antibiotics', 'Pain Relief', 'Cardiology', 'Vitamins', 'Skin Care'];

const PRODUCTS = [
  { name: 'Amoxicillin 500mg', meta: 'Strip of 10', price: 12.5, tag: 'In Stock' },
  { name: 'Ibuprofen 400mg', meta: 'Box of 20', price: 8.2 },
  { name: 'Lisinopril 10mg', meta: 'Bottle of 30', price: 15.75 },
  { name: 'Metformin 850mg', meta: 'Strip of 15', price: 11.3 },
  { name: 'Vitamin C 1000mg', meta: 'Effervescent Tube', price: 6.5, tag: 'Low Stock' },
];

const INITIAL_CART = [
  { name: 'Amoxicillin 500mg', price: 12.5, qty: 2 },
  { name: 'Ibuprofen 400mg', price: 8.2, qty: 1 },
  { name: 'Lisinopril 10mg', price: 15.75, qty: 1 },
];

export default function POSPage() {
  const [category, setCategory] = useState('All Medicines');
  const [cart, setCart] = useState(INITIAL_CART);
  const [payment, setPayment] = useState('CASH');

  const updateQty = (name, delta) => {
    setCart((c) => c.map((item) => (item.name === name ? { ...item, qty: Math.max(1, item.qty + delta) } : item)));
  };

  const addToCart = (product) => {
    setCart((c) => {
      const existing = c.find((item) => item.name === product.name);
      if (existing) return c.map((item) => (item.name === product.name ? { ...item, qty: item.qty + 1 } : item));
      return [...c, { name: product.name, price: product.price, qty: 1 }];
    });
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <AppShell active="POS" title="" searchPlaceholder="Scan Barcode or Search Medicine Name...">
      <div className="pos-layout">
        <div className="pos-catalog">
          <div className="pos-search-row">
            <div className="search-input" style={{ flex: 1 }}>
              <Icon name="search" size={16} />
              <input type="text" placeholder="Scan Barcode or Search Medicine Name..." />
            </div>
            <button type="button" className="btn btn-solid"><Icon name="scan" size={16} /> Scan</button>
          </div>

          <div className="pos-categories">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" className={c === category ? 'active' : ''} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>

          <div className="pos-product-grid">
            {PRODUCTS.map((p) => (
              <div className="pos-product-card" key={p.name}>
                {p.tag && <span className={`pos-tag${p.tag === 'Low Stock' ? ' warn' : ''}`}>{p.tag}</span>}
                <div className="pos-product-thumb" />
                <div className="cell-primary">{p.name}</div>
                <div className="cell-sub">{p.meta}</div>
                <div className="pos-product-footer">
                  <span className="cell-primary">${p.price.toFixed(2)}</span>
                  <button type="button" className="pos-add-btn" onClick={() => addToCart(p)}>
                    <Icon name="cart" size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="pos-cart">
          <div className="pos-cart-head">
            <span>Active Cart</span>
            <Icon name="trash" size={16} />
          </div>

          <div className="pos-patient">
            <span className="pos-patient-avatar">JD</span>
            <div>
              <div className="cell-primary">John Doe</div>
              <div className="cell-sub">ID: #99283-4</div>
            </div>
          </div>

          <div className="pos-cart-items">
            {cart.map((item) => (
              <div className="pos-cart-item" key={item.name}>
                <div>
                  <div className="cell-primary">{item.name}</div>
                  <div className="cell-sub">Unit: ${item.price.toFixed(2)}</div>
                </div>
                <div className="pos-qty">
                  <button type="button" onClick={() => updateQty(item.name, -1)}><Icon name="minus" size={14} /></button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQty(item.name, 1)}><Icon name="plus" size={14} /></button>
                </div>
                <span className="cell-primary">${(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="pos-totals">
            <div className="totals-row"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
            <div className="totals-row"><span>Discount</span><a href="#discount" className="link-cta">Add</a></div>
            <div className="totals-row"><span>Tax (8%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="totals-row total"><span>Total Amount</span><span>${total.toFixed(2)}</span></div>
          </div>

          <div className="form-field">
            <label>Payment Method</label>
            <div className="pos-payment-methods">
              {[
                { key: 'CASH', icon: 'banknote' },
                { key: 'CARD', icon: 'creditCard' },
                { key: 'DIGITAL', icon: 'scan' },
              ].map((m) => (
                <button
                  key={m.key}
                  type="button"
                  className={payment === m.key ? 'active' : ''}
                  onClick={() => setPayment(m.key)}
                >
                  <Icon name={m.icon} size={18} />
                  {m.key}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="btn btn-solid" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}>
            <Icon name="checkCircle" size={16} /> Complete Transaction
          </button>
          <button type="button" className="btn btn-mint" style={{ width: '100%', justifyContent: 'center', marginTop: 10 }}>
            <Icon name="print" size={16} /> Print Receipt
          </button>
        </aside>
      </div>
    </AppShell>
  );
}
