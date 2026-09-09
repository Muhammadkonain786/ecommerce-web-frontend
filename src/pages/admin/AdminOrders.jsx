import { useEffect, useState } from 'react';

const API_BASE_URL = "https://ecommerce-web-backend-production-3020.up.railway.app";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/orders`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

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
                    <span className={`admin-status-badge admin-status-${o.status.toLowerCase()}`}>
                      {o.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
