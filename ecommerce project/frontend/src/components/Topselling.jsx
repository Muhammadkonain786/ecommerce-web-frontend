export default function Topselling() {
  const products = [
    {
      id: 1,
      name: "VERTICAL STRIPED SHIRT",
      image: "/image5.png",
      rating: "5.0/5",
      price: "$212",
      originalPrice: "$260",
      discount: "-20%",
    },
    {
      id: 2,
      name: "COURAGE GRAPHIC T-SHIRT",
      image: "/image6.png",
      rating: "4.0/5",
      price: "$145",
    },
    {
      id: 3,
      name: "LOOSE FIT BERMUDA SHORTS",
      image: "/image7.png",
      rating: "3.0/5",
      price: "$80",
    },
    {
      id: 4,
      name: "FADED SKINNY JEANS",
      image: "/image8.png",
      rating: "2.0/5",
      price: "$210",
    },
  ];

  return (
    <section className="arrivals-section">
      <div className="arrivals-container">
        
        {/* Section Heading */}
        <h2 className="section-title">Top Selling</h2>

        {/* Products Grid */}
        <div className="products-grid">
          {products.map((product) => (
            <div className="product-card" key={product.id}>
              <div className="product-img-wrapper">
                <img src={product.image} alt={product.name} className="product-img" />
              </div>
              <h3 className="product-name">{product.name}</h3>
              
              {/* Rating Stars */}
              <div className="product-rating">
                <div className="stars">★★★★☆</div>
                <span className="rating-number">{product.rating}</span>
              </div>

              {/* Price & Discount */}
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
          ))}
        </div>

        {/* View All Button */}
        <div className="view-all-wrapper">
          <button className="view-all-btn">View All</button>
        </div>

      </div>
    </section>
  );
}