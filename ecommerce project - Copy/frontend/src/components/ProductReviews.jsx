import React, { useState, useEffect } from 'react';

export default function ProductReviews() {
  const [activeTab, setActiveTab] = useState('reviews');
  const [reviewsData, setReviewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        // Live Railway backend URL added here
        const response = await fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/reviews');
        if (!response.ok) {
          throw new Error('Reviews load karne mein masla hai');
        }
        const data = await response.json();
        setReviewsData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div className="product-reviews-container">
      {/* Tabs Navigation */}
      <div className="product-tabs">
        <button 
          className={`tab-item ${activeTab === 'details' ? 'active' : ''}`}
          onClick={() => setActiveTab('details')}
        >
          Product Details
        </button>
        <button 
          className={`tab-item ${activeTab === 'reviews' ? 'active' : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Rating & Reviews
        </button>
        <button 
          className={`tab-item ${activeTab === 'faqs' ? 'active' : ''}`}
          onClick={() => setActiveTab('faqs')}
        >
          FAQs
        </button>
      </div>

      {/* Conditional Content based on Tab */}
      {activeTab === 'reviews' && (
        <div className="reviews-section-content">
          {/* Header Bar */}
          <div className="reviews-header">
            <h2 className="reviews-main-title">
              All Reviews <span className="reviews-count">(451)</span>
            </h2>
            <div className="reviews-actions">
              <button className="review-filter-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 21v-7m0-4V3m8 18v-9m0-4V3m8 18v-5m0-2V3M1 14h6m2-6h6m2 8h6"/></svg>
              </button>
              <select className="reviews-sort-select">
                <option>Latest</option>
                <option>Oldest</option>
                <option>Highest Rating</option>
              </select>
              <button className="write-review-main-btn">Write a Review</button>
            </div>
          </div>

          {/* Loading & Error States */}
          {loading && <p>Loading reviews...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}

          {/* Reviews Grid (2 Columns) */}
          {!loading && !error && (
            <div className="reviews-grid">
              {reviewsData.map((review) => (
                <div key={review.id} className="review-card">
                  <div className="review-card-header">
                    <span className="review-stars">{review.rating}</span>
                    <span className="review-options">...</span>
                  </div>
                  <div className="review-author-wrapper">
                    <h3 className="review-author-name">{review.name}</h3>
                    <span className="review-verified-badge">✓</span>
                  </div>
                  <p className="review-body-text">"{review.text}"</p>
                  <p className="review-date-posted">{review.date}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'details' && (
        <div className="tab-content-placeholder">
          <p>Product details information goes here...</p>
        </div>
      )}

      {activeTab === 'faqs' && (
        <div className="tab-content-placeholder">
          <p>Frequently asked questions go here...</p>
        </div>
      )}
    </div>
  );
}