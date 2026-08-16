import React from 'react';

export default function Shop() {
  return (
    <div className="shop-container" style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Breadcrumb / Title */}
      <div style={{ marginBottom: '20px', color: '#666', fontSize: '14px' }}>
        Home &gt; <span style={{ color: '#000', fontWeight: '500' }}>Shop</span>
      </div>

      <div style={{ display: 'flex', gap: '30px' }}>
        {/* Left Side: Filters Sidebar */}
        <div style={{ width: '250px', border: '1px solid #f0f0f0', padding: '20px', borderRadius: '10px', height: 'fit-content' }}>
          <h3>Filters</h3>
          <hr style={{ margin: '15px 0', border: '0', borderTop: '1px solid #eee' }} />
          <p style={{ color: '#666', fontSize: '14px' }}>T-shirts</p>
          <p style={{ color: '#666', fontSize: '14px' }}>Shorts</p>
          <p style={{ color: '#666', fontSize: '14px' }}>Shirts</p>
          <p style={{ color: '#666', fontSize: '14px' }}>Hoodie</p>
          <p style={{ color: '#666', fontSize: '14px' }}>Jeans</p>
        </div>

        {/* Right Side: Products Grid */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Casual Shop</h2>
            <span style={{ color: '#666', fontSize: '14px' }}>Showing Products</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {/* Sample Product Card */}
            <div style={{ border: '1px solid #eee', padding: '15px', borderRadius: '10px' }}>
              <div style={{ background: '#f0f0f0', height: '200px', borderRadius: '8px', marginBottom: '10px' }}></div>
              <h4 style={{ fontSize: '16px', fontWeight: '600' }}>Gradient Graphic T-shirt</h4>
              <p style={{ color: '#ffc106', margin: '5px 0' }}>★★★★☆ <span style={{ color: '#666', fontSize: '12px' }}>4.5/5</span></p>
              <p style={{ fontWeight: 'bold', fontSize: '18px' }}>$145</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}