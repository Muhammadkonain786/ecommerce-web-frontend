export default function Hero() {
  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Left Side Content */}
        <div className="hero-content">
          <h1 className="hero-title">
            FIND CLOTHES THAT MATCHES YOUR STYLE
          </h1>
          <p className="hero-description">
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </p>
          <button className="hero-btn">Shop Now</button>

          {/* Stats Counter */}
          <div className="hero-stats">
            <div className="stat-item">
              <h3>200+</h3>
              <p>International Brands</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>2,000+</h3>
              <p>High-Quality Products</p>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-item">
              <h3>30,000+</h3>
              <p>Happy Customers</p>
            </div>
          </div>
        </div>

        {/* Right Side Image & Sparkle Stars */}
        <div className="hero-image-wrapper">
          {/* Small Star Icon */}
          <svg className="star-icon star-small" width="56" height="56" viewBox="0 0 56 56" fill="none">
            <path d="M28 0C28 15.464 15.464 28 0 28C15.464 28 28 40.536 28 56C28 40.536 40.536 28 56 28C40.536 28 28 15.464 28 0Z" fill="black"/>
          </svg>

          {/* Large Star Icon */}
          <svg className="star-icon star-large" width="104" height="104" viewBox="0 0 104 104" fill="none">
            <path d="M52 0C52 28.7188 28.7188 52 0 52C28.7188 52 52 75.2812 52 104C52 75.2812 75.2812 52 104 52C75.2812 52 52 28.7188 52 0Z" fill="black"/>
          </svg>

          {/* Image */}
          <img 
            src="/hero-image.jpg" 
            alt="Find Clothes That Matches Your Style" 
            className="hero-image" 
          />
        </div>

      </div>
    </section>
  );
}