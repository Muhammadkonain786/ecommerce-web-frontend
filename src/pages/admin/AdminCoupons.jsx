import { useEffect, useState } from 'react';

const API_BASE_URL = "https://ecommerce-web-backend-production-3020.up.railway.app";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [code, setCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [saving, setSaving] = useState(false);

  const loadCoupons = () => {
    fetch(`${API_BASE_URL}/api/admin/coupons`)
      .then((res) => res.json())
      .then((data) => {
        setCoupons(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadCoupons();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/admin/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, discountPercent: Number(discountPercent) }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Coupon add nahi ho saka');
      }

      setCode('');
      setDiscountPercent('');
      loadCoupons();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Ye coupon delete karna hai?')) return;
    await fetch(`${API_BASE_URL}/api/admin/coupons/${id}`, { method: 'DELETE' });
    loadCoupons();
  };

  return (
    <div>
      <h1 className="admin-page-title">Promo Codes</h1>

      <div className="admin-panel">
        <h2>Naya Promo Code Banayein</h2>
        <form className="admin-inline-form" onSubmit={handleAdd}>
          <input
            placeholder="CODE (jaise SAVE10)"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            required
          />
          <input
            type="number"
            placeholder="Discount %"
            value={discountPercent}
            onChange={(e) => setDiscountPercent(e.target.value)}
            required
            min="1"
            max="100"
          />
          <button className="admin-primary-btn" disabled={saving}>
            {saving ? 'Adding...' : '+ Add Coupon'}
          </button>
        </form>
      </div>

      {loading ? (
        <div className="admin-loading">Loading coupons...</div>
      ) : coupons.length === 0 ? (
        <p className="admin-empty-text">Abhi koi promo code nahi bana.</p>
      ) : (
        <div className="admin-panel">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Discount</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.code}</strong></td>
                  <td>{c.discountPercent}%</td>
                  <td>{new Date(c.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button className="admin-link-btn admin-link-danger" onClick={() => handleDelete(c.id)}>
                      Delete
                    </button>
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
