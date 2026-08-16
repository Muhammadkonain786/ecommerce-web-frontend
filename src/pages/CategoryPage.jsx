import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ShopSidebar from '../components/ShopSidebar';

export default function CategoryPage() {
  const { styleName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortBy, setSortBy] = useState('most-popular');

  // Initial min aur max price range ko wide rakha hai taake shuru mein saare cards show hon
  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: 0,
    maxPrice: 1000,
    color: null,
    size: null
  });

  useEffect(() => {
    const currentStyle = styleName || 'casual';
    
    // Backend API call
    fetch(`http://localhost:5000/api/products/category/${currentStyle}`)
      .then(res => res.json())
      .then(data => {
        console.log("Products fetched successfully:", data);
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(err => console.log("Error fetching products:", err));
  }, [styleName]);

  // Apply Filter Handler
  const handleApplyFilters = (filters) => {
    console.log("Applied Filters received from sidebar:", filters);
    setAppliedFilters(filters);
    
    let tempProducts = [...products];

    // Price Filter logic
    tempProducts = tempProducts.filter(p => {
      const priceNum = Number(p.price.replace('$', ''));
      return priceNum >= filters.minPrice && priceNum <= filters.maxPrice;
    });

    // Color logic
    if (filters.color) {
      tempProducts = tempProducts.filter(p => p.color === filters.color);
    }
    // Size logic
    if (filters.size) {
      tempProducts = tempProducts.filter(p => p.sizes && p.sizes.includes(filters.size));
    }

    setFilteredProducts(tempProducts);
  };

  // Sorting Handler
  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sorted = [...filteredProducts];

    if (value === 'price-low') {
      sorted.sort((a, b) => Number(a.price.replace('$', '')) - Number(b.price.replace('$', '')));
    } else if (value === 'price-high') {
      sorted.sort((a, b) => Number(b.price.replace('$', '')) - Number(a.price.replace('$', '')));
    }
    setFilteredProducts(sorted);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
      
      {/* Top Header Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: '800', textTransform: 'uppercase', margin: 0 }}>
          {styleName || 'Casual'}
        </h1>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', color: '#7f7f7f', fontSize: '14px' }}>
          <span>Showing 1-{filteredProducts.length} of {filteredProducts.length} Products</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>Sort by:</span>
            <select 
              value={sortBy} 
              onChange={handleSortChange} 
              style={{ border: 'none', background: 'none', fontWeight: '650', color: '#000', cursor: 'pointer', fontSize: '14px', outline: 'none' }}
            >
              <option value="most-popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: '30px', alignItems: 'start' }}>
        
        {/* Sidebar */}
        <ShopSidebar onApply={handleApplyFilters} />

        {/* Products Grid */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <div key={product.id} style={{ background: '#fff', borderRadius: '20px', padding: '10px' }}>
                  <div style={{ background: '#F0EEED', borderRadius: '20px', overflow: 'hidden', height: '280px', marginBottom: '15px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '8px' }}>{product.name}</h3>
                  
                  {/* Rating */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px', fontSize: '14px' }}>
                    <span style={{ color: '#FFC633' }}>{product.stars || '★★★★☆'}</span>
                    <span style={{ color: '#000', fontSize: '12px' }}>{product.rating || '4.5/5'}</span>
                  </div>

                  {/* Price */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: '700', color: '#000' }}>{product.price}</span>
                    {product.originalPrice && (
                      <span style={{ fontSize: '20px', fontWeight: '700', color: '#b2b2b2', textDecoration: 'line-through' }}>{product.originalPrice}</span>
                    )}
                    {product.discount && (
                      <span style={{ background: 'rgba(255, 51, 51, 0.1)', color: '#FF3333', padding: '4px 10px', borderRadius: '62px', fontSize: '12px', fontWeight: '600' }}>
                        {product.discount}
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p style={{ fontSize: '16px', color: '#7f7f7f', gridColumn: 'span 3', textAlign: 'center', padding: '40px' }}>
                No products found matching your filters.
              </p>
            )}
          </div>

          {/* Pagination */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(0,0,0,0.1)', marginTop: '40px', paddingTop: '20px' }}>
            <button style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '10px 16px', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: '500' }}>
              &larr; Previous
            </button>
            <div style={{ display: 'flex', gap: '6px' }}>
              <button style={{ border: 'none', background: '#F0F0F0', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>1</button>
              <button style={{ border: 'none', background: 'none', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>2</button>
              <button style={{ border: 'none', background: 'none', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>3</button>
              <span style={{ padding: '6px' }}>...</span>
              <button style={{ border: 'none', background: 'none', width: '36px', height: '36px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer' }}>10</button>
            </div>
            <button style={{ border: '1px solid rgba(0,0,0,0.1)', padding: '10px 16px', borderRadius: '8px', background: '#fff', cursor: 'pointer', fontWeight: '500' }}>
              Next &rarr;
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}