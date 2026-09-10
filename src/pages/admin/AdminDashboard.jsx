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
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState('all'); // 'all' | '7' | '30' | '90'

  useEffect(() => {
    setLoading(true);
    const statsUrl =
      dateRange === 'all'
        ? `${API_BASE_URL}/api/admin/stats`
        : `${API_BASE_URL}/api/admin/stats?days=${dateRange}`;

    Promise.all([
      fetch(statsUrl).then((res) => res.json()),
      fetch(`${API_BASE_URL}/api/admin/best-sellers`).then((res) => res.json()),
    ])
      .then(([statsData, bestSellersData]) => {
        setStats(statsData);
        setBestSellers(bestSellersData);
        setLoading(false);
      })
      .catch(() => {
        setError('Stats load nahi ho sake.');
        setLoading(false);
      });
  }, [dateRange]);

  if (loading) return <div className="admin-loading">Loading dashboard...</div>;
  if (error) return <div className="admin-error">{error}</div>;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Dashboard</h1>
        <div className="admin-date-range-selector">
          {[
            { label: 'Last 7 Days', value: '7' },
            { label: 'Last 30 Days', value: '30' },
            { label: 'Last 90 Days', value: '90' },
            { label: 'All Time', value: 'all' },
          ].map((opt) => (
            <button
              key={opt.value}
              className={`admin-range-btn ${dateRange === opt.value ? 'active' : ''}`}
              onClick={() => setDateRange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

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
      {stats.lowStockCount > 0 && (
        <div className="admin-alert-banner admin-alert-warning">
          🔶 {stats.lowStockCount} product(s) ka stock kam ho raha hai (5 ya usse kam) — jald restock karein.
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
      <div className="admin-panel">
        <h2>Best-Selling Products</h2>
        {bestSellers.length === 0 ? (
          <p className="admin-empty-text">Abhi tak koi sale nahi hui.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Units Sold</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((p) => (
                <tr key={p.name}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={p.image} alt={p.name} className="admin-table-img" />
                    {p.name}
                  </td>
                  <td>{p.quantitySold}</td>
                  <td>${p.revenue.toFixed(0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="admin-panel">
        <h2>Category-wise Sales</h2>
        {stats.categoryBreakdown.length === 0 ? (
          <p className="admin-empty-text">Is date range mein koi sale nahi hui.</p>
        ) : (
          <div className="admin-category-list">
            {stats.categoryBreakdown.map((c) => {
              const maxRevenue = Math.max(...stats.categoryBreakdown.map((x) => x.revenue));
              const widthPercent = maxRevenue > 0 ? (c.revenue / maxRevenue) * 100 : 0;
              return (
                <div className="admin-category-row" key={c.category}>
                  <span className="admin-category-name">{c.category}</span>
                  <div className="admin-category-bar-track">
                    <div className="admin-category-bar-fill" style={{ width: `${widthPercent}%` }}></div>
                  </div>
                  <span className="admin-category-value">${c.revenue.toFixed(0)} ({c.unitsSold} units)</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
