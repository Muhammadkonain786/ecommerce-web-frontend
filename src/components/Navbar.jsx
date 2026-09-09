import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="nav-container">
        
        {/* Left Side: Mobile Hamburger & Logo */}
        <div className="nav-left">
          <button 
            className="hamburger-btn" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <a href="#" className="nav-logo">SHOP.CO</a>
        </div>

        {/* Center Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <a href="#shop" className="nav-link">
              Shop 
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginLeft: '4px' }}>
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
          </li>
          <li><a href="#sale" className="nav-link">On Sale</a></li>
          <li><a href="#new-arrivals" className="nav-link">New Arrivals</a></li>
          <li><a href="#brands" className="nav-link">Brands</a></li>
        </ul>

        {/* Search Bar */}
        <div className="nav-search">
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Search for products..." className="search-input" />
        </div>

        {/* Right Icons: Cart & Profile */}
        <div className="nav-icons">
          <button className="icon-btn" aria-label="Shopping Cart">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
          </button>

          <button className="icon-btn" aria-label="User Account">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
        </div>

      </div>
    </nav>
  );
}