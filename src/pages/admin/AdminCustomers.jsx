import { useEffect, useState } from 'react';

const API_BASE_URL = "https://ecommerce-web-backend-production-3020.up.railway.app";

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    Promise.all([
      fetch(`${API_BASE_URL}/api/admin/customers`).then((res) => res.json()),
      fetch(`${API_BASE_URL}/api/admin/orders`).then((res) => res.json()),
    ])
      .then(([customersData, ordersData]) => {
        setCustomers(customersData);
        setAllOrders(ordersData);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const getCustomerOrders = (customer) => {
    return allOrders.filter(
      (o) => (o.customerEmail || o.customerName) === (customer.email || customer.name)
    );
  };

  if (loading) return <div className="admin-loading">Loading customers...</div>;

  return (
    <div>
      <h1 className="admin-page-title">Customers</h1>

      {customers.length === 0 ? (
        <p className="admin-empty-text">Abhi tak koi customer order nahi hua.</p>
      ) : (
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Total Orders</th>
                <th>Total Spent</th>
                <th>Last Order</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {customers.map((c, i) => (
                <tr key={c.email || i}>
                  <td>{c.name}</td>
                  <td>{c.email || '—'}</td>
                  <td>{c.totalOrders}</td>
                  <td>${c.totalSpent.toFixed(0)}</td>
                  <td>{new Date(c.lastOrderDate).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-link-btn" onClick={() => setSelectedCustomer(c)}>
                      View Orders
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedCustomer && (
        <div className="admin-modal-backdrop" onClick={() => setSelectedCustomer(null)}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{selectedCustomer.name}'s Order History</h2>

            {getCustomerOrders(selectedCustomer).length === 0 ? (
              <p className="admin-empty-text">Koi order nahi mila.</p>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {getCustomerOrders(selectedCustomer).map((o) => (
                    <tr key={o.id}>
                      <td>#{o.id.slice(-6)}</td>
                      <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td>
                        {o.items.map((it) => (
                          <div key={it.name} className="admin-order-item-line">
                            {it.name} × {it.quantity}
                          </div>
                        ))}
                      </td>
                      <td>${o.totalAmount.toFixed(0)}</td>
                      <td>
                        <span className={`admin-status-badge admin-status-${o.status.toLowerCase()}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}

            <div className="admin-modal-actions">
              <button className="admin-secondary-btn" onClick={() => setSelectedCustomer(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
