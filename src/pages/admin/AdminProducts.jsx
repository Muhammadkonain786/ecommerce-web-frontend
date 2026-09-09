import { useEffect, useState } from 'react';
import { uploadImageToCloudinary } from '../../utils/cloudinary';

const API_BASE_URL = "https://ecommerce-web-backend-production-3020.up.railway.app";

const emptyForm = {
  name: '',
  price: '',
  originalPrice: '',
  costPrice: '',
  stock: '',
  category: 'casual',
  description: '',
  image: '',
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);

  const loadProducts = () => {
    setLoading(true);
    fetch(`${API_BASE_URL}/api/admin/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const openAddForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (product) => {
    setForm({
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice || '',
      costPrice: product.costPrice || '',
      stock: product.stock,
      category: product.category,
      description: product.description || '',
      image: product.image,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const url = await uploadImageToCloudinary(file);
      setForm((f) => ({ ...f, image: url }));
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : undefined,
      costPrice: Number(form.costPrice) || 0,
      stock: Number(form.stock) || 0,
    };

    try {
      const url = editingId
        ? `${API_BASE_URL}/api/admin/products/${editingId}`
        : `${API_BASE_URL}/api/admin/products`;
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Save nahi ho saka');

      setShowForm(false);
      loadProducts();
    } catch (err) {
      alert(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Kya aap sach mein ye product delete karna chahte hain?')) return;

    try {
      await fetch(`${API_BASE_URL}/api/admin/products/${id}`, { method: 'DELETE' });
      loadProducts();
    } catch (err) {
      alert('Delete nahi ho saka');
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">Products</h1>
        <button className="admin-primary-btn" onClick={openAddForm}>
          + Add Product
        </button>
      </div>

      {showForm && (
        <div className="admin-modal-backdrop" onClick={() => setShowForm(false)}>
          <form
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>

            <label>Product Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />

            <label>Image</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {uploading && <p className="admin-hint-text">Uploading...</p>}
            {form.image && (
              <img src={form.image} alt="preview" className="admin-image-preview" />
            )}

            <div className="admin-form-row">
              <div>
                <label>Price ($)</label>
                <input
                  required
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
              </div>
              <div>
                <label>Original Price ($)</label>
                <input
                  type="number"
                  value={form.originalPrice}
                  onChange={(e) => setForm({ ...form, originalPrice: e.target.value })}
                />
              </div>
            </div>

            <div className="admin-form-row">
              <div>
                <label>Cost Price ($)</label>
                <input
                  type="number"
                  value={form.costPrice}
                  onChange={(e) => setForm({ ...form, costPrice: e.target.value })}
                />
              </div>
              <div>
                <label>Stock (quantity)</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm({ ...form, stock: e.target.value })}
                />
              </div>
            </div>

            <label>Category</label>
            <select
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option value="casual">Casual</option>
              <option value="formal">Formal</option>
              <option value="party">Party</option>
              <option value="gym">Gym</option>
            </select>

            <label>Description</label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <div className="admin-modal-actions">
              <button type="button" className="admin-secondary-btn" onClick={() => setShowForm(false)}>
                Cancel
              </button>
              <button type="submit" className="admin-primary-btn" disabled={saving || uploading}>
                {saving ? 'Saving...' : 'Save Product'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="admin-loading">Loading products...</div>
      ) : (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id}>
                <td>
                  <img src={p.image} alt={p.name} className="admin-table-img" />
                </td>
                <td>{p.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{p.category}</td>
                <td>${p.price}</td>
                <td>{p.stock}</td>
                <td>
                  {p.stock > 0 ? (
                    <span className="admin-status-badge admin-status-instock">In Stock</span>
                  ) : (
                    <span className="admin-status-badge admin-status-outofstock">Out of Stock</span>
                  )}
                </td>
                <td>
                  <button className="admin-link-btn" onClick={() => openEditForm(p)}>Edit</button>
                  <button className="admin-link-btn admin-link-danger" onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
