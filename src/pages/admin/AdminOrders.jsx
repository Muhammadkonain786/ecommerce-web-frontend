import { useEffect, useState } from 'react';

const API_BASE_URL = "https://ecommerce-web-backend-production-3020.up.railway.app";
const STATUS_OPTIONS = ['Pending', 'Shipped', 'Delivered', 'Cancelled'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invoiceOrder, setInvoiceOrder] = useState(null);

  const loadOrders = () => {
    fetch(`${API_BASE_URL}/api/admin/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    // UI turant update karein (optimistic), phir backend ko bhejein
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );

    try {
      await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
    } catch (err) {
      alert('Status update nahi ho saka');
      loadOrders();
    }
  };

  const handleDelete = async (orderId) => {
    if (!confirm('Kya aap sach mein ye order delete karna chahte hain?')) return;

    try {
      await fetch(`${API_BASE_URL}/api/admin/orders/${orderId}`, { method: 'DELETE' });
      setOrders((prev) => prev.filter((o) => o.id !== orderId));
    } catch (err) {
      alert('Order delete nahi ho saka');
    }
  };

  if (loading) return <div className="admin-loading">Loading orders...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>

      {orders.length === 0 ? (
        <p className="admin-empty-text">Abhi tak koi order nahi aya.</p>
      ) : (
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Profit</th>
                <th>Status</th>
                <th>Invoice</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id.slice(-6)}</td>
                  <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td>{o.customerName}</td>
                  <td>
                    {o.items.map((it) => (
                      <div key={it.name} className="admin-order-item-line">
                        {it.name} × {it.quantity}
                      </div>
                    ))}
                  </td>
                  <td>${o.totalAmount.toFixed(0)}</td>
                  <td>${o.totalProfit.toFixed(0)}</td>
                  <td>
                    <select
                      className={`admin-status-select admin-status-${o.status.toLowerCase()}`}
                      value={o.status}
                      onChange={(e) => handleStatusChange(o.id, e.target.value)}
                    >
                      {STATUS_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button className="admin-link-btn" onClick={() => setInvoiceOrder(o)}>
                      View
                    </button>
                  </td>
                  <td>
                    <button className="admin-link-btn admin-link-danger" onClick={() => handleDelete(o.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {invoiceOrder && (
        <div className="admin-modal-backdrop invoice-no-print" onClick={() => setInvoiceOrder(null)}>
          <div className="admin-modal invoice-modal" onClick={(e) => e.stopPropagation()}>
            <div className="invoice-print-area">
              <div className="invoice-header">
                <h2>SHOP.CO</h2>
                <p className="invoice-title">INVOICE</p>
              </div>

              <div className="invoice-meta">
                <div>
                  <strong>Order ID:</strong> #{invoiceOrder.id.slice(-6)}<br />
                  <strong>Date:</strong> {new Date(invoiceOrder.createdAt).toLocaleDateString()}
                </div>
                <div>
                  <strong>Bill To:</strong><br />
                  {invoiceOrder.customerName}<br />
                  {invoiceOrder.customerEmail}<br />
                  {invoiceOrder.customerPhone}<br />
                  {invoiceOrder.address}
                </div>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Size</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceOrder.items.map((it, i) => (
                    <tr key={i}>
                      <td>{it.name}</td>
                      <td>{it.size || '—'}</td>
                      <td>{it.quantity}</td>
                      <td>${it.price}</td>
                      <td>${(it.price * it.quantity).toFixed(0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="invoice-total-row">
                <span>Total Amount</span>
                <span>${invoiceOrder.totalAmount.toFixed(0)}</span>
              </div>

              <p className="invoice-footer">Shukriya! SHOP.CO se kharidari karne ke liye.</p>
            </div>

            <div className="admin-modal-actions invoice-no-print">
              <button className="admin-secondary-btn" onClick={() => setInvoiceOrder(null)}>
                Close
              </button>
              <button className="admin-primary-btn" onClick={() => window.print()}>
                Print / Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}