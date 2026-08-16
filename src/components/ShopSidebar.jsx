import React, { useState } from 'react';
import '../App.css';

export default function ShopSidebar({ onApply }) {
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  
  // Price range states for dual thumbs (0 to 1000)
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  
  const handleMinChange = (e) => {
    const value = Number(e.target.value);
    if (value <= maxPrice - 10) {
      setMinPrice(value);
    }
  };

  const handleMaxChange = (e) => {
    const value = Number(e.target.value);
    if (value >= minPrice + 10) {
      setMaxPrice(value);
    }
  };

  // Filter apply karne ka function
  const handleApplyClick = () => {
    if (onApply) {
      onApply({
        minPrice,
        maxPrice,
        color: selectedColor,
        size: selectedSize
      });
    }
  };

  return (
    <aside className="shop-sidebar">
      
      {/* Filters Header */}
      <div className="sidebar-header">
        <h3 className="sidebar-title">Filters</h3>
        <span className="sidebar-icon">⚙️</span>
      </div>

      {/* Categories List */}
      <div className="sidebar-categories">
        <div className="sidebar-category-item"><span>T-shirts</span> <span>&gt;</span></div>
        <div className="sidebar-category-item"><span>Shorts</span> <span>&gt;</span></div>
        <div className="sidebar-category-item"><span>Shirts</span> <span>&gt;</span></div>
        <div className="sidebar-category-item"><span>Hoodie</span> <span>&gt;</span></div>
        <div className="sidebar-category-item"><span>Jeans</span> <span>&gt;</span></div>
      </div>

      {/* Dual Price Range */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>Price</span> <span>∧</span>
        </div>
        
        <div className="dual-range-container">
          <div className="price-slider-track"></div>
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={minPrice} 
            onChange={handleMinChange}
            className="price-range-input range-min" 
          />
          <input 
            type="range" 
            min="0" 
            max="1000" 
            value={maxPrice} 
            onChange={handleMaxChange}
            className="price-range-input range-max" 
          />
        </div>

        <div className="price-range-labels">
          <span>${minPrice}</span>
          <span>${maxPrice}</span>
        </div>
      </div>

      {/* Colors Filter */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>Colors</span> <span>∧</span>
        </div>
        <div className="colors-grid">
          {['#00C12B', '#FF0000', '#F5DD06', '#F57906', '#06CAF5', '#063AF5', '#7D06F5', '#F506A2', '#FFFFFF', '#000000'].map((color, index) => (
            <div 
              key={index} 
              onClick={() => setSelectedColor(color)}
              className="color-circle"
              style={{ 
                backgroundColor: color, 
                border: color === '#FFFFFF' ? '1px solid #ccc' : 'none',
                boxShadow: selectedColor === color ? '0 0 0 2px #000' : 'none'
              }}
            >
              {selectedColor === color && <span style={{ color: color === '#FFFFFF' ? '#000' : '#fff', fontSize: '12px' }}>✓</span>}
            </div>
          ))}
        </div>
      </div>

      {/* Size Filter */}
      <div className="sidebar-section">
        <div className="sidebar-section-header">
          <span>Size</span> <span>∧</span>
        </div>
        <div className="size-grid">
          {['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'].map((size, index) => (
            <button
              key={index}
              onClick={() => setSelectedSize(size)}
              className={`size-btn ${selectedSize === size ? 'active' : 'inactive'}`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Dress Style Filter */}
      <div className="sidebar-section-last">
        <div className="sidebar-section-header">
          <span>Dress Style</span> <span>∧</span>
        </div>
        <div className="dress-style-list">
          <div className="sidebar-category-item"><span>Casual</span> <span>&gt;</span></div>
          <div className="sidebar-category-item"><span>Formal</span> <span>&gt;</span></div>
          <div className="sidebar-category-item"><span>Party</span> <span>&gt;</span></div>
          <div className="sidebar-category-item"><span>Gym</span> <span>&gt;</span></div>
        </div>
      </div>

      {/* Apply Filter Button */}
      <button className="apply-filter-btn" onClick={handleApplyClick}>
        Apply Filter
      </button>

    </aside>
  );
}