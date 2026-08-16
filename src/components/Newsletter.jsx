export default function Newsletter() {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        
        {/* Left Title */}
        <h2 className="newsletter-title">
          STAY UPTO DATE ABOUT<br />OUR LATEST OFFERS
        </h2>

        {/* Right Form */}
        <div className="newsletter-form">
          <div className="newsletter-input-wrapper">
            <span className="newsletter-icon">
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 0H3C1.35 0 0.01 1.35 0.01 3L0 13C0 14.65 1.35 16 3 16H17C18.65 16 20 14.65 20 13V3C20 1.35 18.65 0 17 0ZM17 4L10 8.5L3 4V3L10 7.5L17 3V4Z" fill="#8d8d8d"/>
              </svg>
            </span>
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="newsletter-input"
            />
          </div>
          <button className="newsletter-btn">
            Subscribe to Newsletter
          </button>
        </div>

      </div>
    </section>
  );
}