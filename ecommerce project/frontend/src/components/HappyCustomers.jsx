import { useRef } from 'react';

export default function HappyCustomers({ reviews = [] }) {
  const scrollRef = useRef(null);

  const defaultReviews = [
    { 
      id: 1, 
      name: "Sarah M.", 
      stars: "★★★★★", 
      text: "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.", 
      verified: true 
    },
    { 
      id: 2, 
      name: "Alex K.", 
      stars: "★★★★★", 
      text: "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable.", 
      verified: true 
    },
    { 
      id: 3, 
      name: "James L.", 
      stars: "★★★★★", 
      text: "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is diverse and on-point.", 
      verified: true 
    },
    { 
      id: 4, 
      name: "Moiz R.", 
      stars: "★★★★★", 
      text: "Amazing customer service and fast delivery! The fabrics feel premium and the fitting is completely spot on. Highly recommended.", 
      verified: true 
    }
  ];

  const displayReviews = reviews && reviews.length > 0 ? reviews : defaultReviews;

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section className="customers-section">
      <div className="customers-header-wrapper">
        <h2 className="section-title customers-title">OUR HAPPY CUSTOMERS</h2>
        <div className="customer-arrows">
          <button className="arrow-btn" onClick={scrollLeft}>←</button>
          <button className="arrow-btn" onClick={scrollRight}>→</button>
        </div>
      </div>

      <div className="reviews-slider" ref={scrollRef}>
        {displayReviews.map((review) => (
          <div className="review-card" key={review.id}>
            <div className="stars">{review.stars}</div>
            <div className="reviewer-info">
              <h3 className="reviewer-name">{review.name}</h3>
              {review.verified && (
                <span className="verified-badge">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 0C3.58 0 0 3.58 0 8C0 12.42 3.58 16 8 16C12.42 16 16 12.42 16 8C16 3.58 12.42 0 8 0ZM6.4 12L2.4 8L3.54 6.86L6.4 9.72L12.46 3.66L13.6 4.8L6.4 12Z" fill="#01AB31"/>
                  </svg>
                </span>
              )}
            </div>
            <p className="review-text">"{review.text}"</p>
          </div>
        ))}
      </div>
    </section>
  );
}