import { useEffect, useState } from 'react';

const API_BASE_URL = "https://ecommerce-web-backend-production-3020.up.railway.app";

function SimpleBarChart({ data }) {
  const width = 700;
  const height = 260;
  const padding = 40;
  const maxVal = Math.max(1, ...data.map((d) => Math.max(d.income, d.profit)));
  const barGroupWidth = (width - padding * 2) / data.length;
  const barWidth = barGroupWidth / 3;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width="100%" height={height}>
      {/* Y axis gridlines */}
      {[0, 0.25, 0.5, 0.75, 1].map((f) => (
        <line
          key={f}
          x1={padding}
          x2={width - padding}
          y1={height - padding - f * (height - padding * 1.5)}
          y2={height - padding - f * (height - padding * 1.5)}
          stroke="#eee"
        />
      ))}

      {data.map((d, i) => {
        const x = padding + i * barGroupWidth + barGroupWidth / 4;
        const incomeH = (d.income / maxVal) * (height - padding * 1.5);
        const profitH = (d.profit / maxVal) * (height - padding * 1.5);
        return (
          <g key={d.month}>
            <rect
              x={x}
              y={height - padding - incomeH}
              width={barWidth}
              height={incomeH}
              fill="#6366F1"
              rx="3"
            />
            <rect
              x={x + barWidth + 4}
              y={height - padding - profitH}
              width={barWidth}
              height={profitH}
              fill="#22C55E"
              rx="3"
            />
            <text
              x={x + barWidth}
              y={height - padding + 16}
              fontSize="11"
              textAnchor="middle"
              fill="#888"
            >
              {d.month}
            </text>
          </g>
        );
      })}

      {/* Legend */}
      <rect x={padding} y={8} width="10" height="10" fill="#6366F1" />
      <text x={padding + 16} y={17} fontSize="12" fill="#555">Income</text>
      <rect x={padding + 80} y={8} width="10" height="10" fill="#22C55E" />
      <text x={padding + 96} y={17} fontSize="12" fill="#555">Profit</text>
    </svg>
  );
}

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/admin/stats`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Stats load nahi ho sake.');
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="admin-stat-cards">
        <div className="admin-stat-card admin-stat-purple">
          <span className="admin-stat-label">Total Income</span>
          <span className="admin-stat-value">${stats.totalIncome.toFixed(0)}</span>
        </div>
        <div className="admin-stat-card admin-stat-blue">
          <span className="admin-stat-label">Total Orders</span>
          <span className="admin-stat-value">{stats.totalOrders}</span>
        </div>
        <div className="admin-stat-card admin-stat-green">
          <span className="admin-stat-label">Total Profit</span>
          <span className="admin-stat-value">${stats.totalProfit.toFixed(0)}</span>
        </div>
        <div className="admin-stat-card admin-stat-orange">
          <span className="admin-stat-label">Total Products</span>
          <span className="admin-stat-value">{stats.totalProducts}</span>
        </div>
      </div>

      {stats.outOfStockCount > 0 && (
        <div className="admin-alert-banner">
          ⚠️ {stats.outOfStockCount} product(s) Out of Stock hain — Products page par check karein.
        </div>
      )}

      <div className="admin-panel">
        <h2>Income &amp; Profit (Last 6 Months)</h2>
        <SimpleBarChart data={stats.monthlyChart} />
      </div>

      <div className="admin-panel">
        <h2>Recent Orders</h2>
        {stats.recentOrders.length === 0 ? (
          <p className="admin-empty-text">Abhi tak koi order nahi aya.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {stats.recentOrders.map((o) => (
                <tr key={o.id}>
                  <td>#{o.id.slice(-6)}</td>
                  <td>{o.customerName}</td>
                  <td>{o.items.length} item(s)</td>
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
      </div>
    </div>
  );
}
