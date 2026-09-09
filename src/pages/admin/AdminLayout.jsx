import { Navigate, NavLink, Outlet, useNavigate } from 'react-router-dom';

export default function AdminLayout() {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === 'true';

  if (!isAdmin) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    sessionStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-logo">SHOP.CO Admin</div>

        <nav className="admin-nav">
          <NavLink to="/admin/dashboard" className="admin-nav-link">
            Dashboard
          </NavLink>
          <NavLink to="/admin/products" className="admin-nav-link">
            Products
          </NavLink>
          <NavLink to="/admin/orders" className="admin-nav-link">
            Orders
          </NavLink>
        </nav>

        <button className="admin-logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
