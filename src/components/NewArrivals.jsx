import { useState } from 'react';
import { Link } from 'react-router-dom'; // 1. Link import karein

export default function NewArrivals({ title = "NEW ARRIVALS", products = [], showDivider = false }) {
  const [showAll, setShowAll] = useState(false);

const visibleProducts = Array.isArray(products) ? (showAll ? products : products.slice(0, 4)) : [];

  return (
    <section className="arrivals-section">
      <div className="arrivals-container">
        
        {showDivider && <div className="section-divider"></div>}

        <h2 className="section-title">{title}</h2>

        {/* Products Grid */}
        <div className="products-grid">
          {visibleProducts.map((product) => (
            /* 2. Har product card ko Link se wrap kiya taake click par /shop open ho */
            <Link to={`/shop/${product.id}`} key={product.id} style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="product-card">
                <div className="product-img-wrapper">
                  <img src={product.image} alt={product.name} className="product-img" />
                </div>
                <h3 className="product-name">{product.name}</h3>
                
                <div className="product-rating">
                  <div className="stars">★★★★☆</div>
                  <span className="rating-number">{product.rating}</span>
                </div>

                <div className="product-pricing">
                  <span className="current-price">{product.price}</span>
                  {product.originalPrice && (
                    <span className="original-price">{product.originalPrice}</span>
                  )}
                  {product.discount && (
                    <span className="discount-badge">{product.discount}</span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All / Show Less Button */}
        {products.length > 4 && (
          <div className="view-all-wrapper">
            <button className="view-all-btn" onClick={() => setShowAll(!showAll)}>
              {showAll ? "Show Less" : "View All"}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}