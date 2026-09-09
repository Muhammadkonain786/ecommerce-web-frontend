import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ProductReviews from '../components/ProductReviews';
import NewArrivals from '../components/NewArrivals'; 

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);
        // Live Railway backend URL for product detail
        const response = await fetch(`https://ecommerce-web-backend-production-3020.up.railway.app/api/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product load karne mein masla hai');
        }
        
        const data = await response.json();
        setProduct(data);
        setMainImage(data.images ? data.images[0] : data.image);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[2] || data.sizes[0]);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedProducts = async () => {
      try {
        // Live Railway backend URL for related products
        const response = await fetch('https://ecommerce-web-backend-production-3020.up.railway.app/api/products/related');
        const data = await response.json();
        setRelatedProducts(data);
      } catch (err) {
        console.error("Related products fetch error:", err);
      }
    };

    fetchProductDetail();
    fetchRelatedProducts();
  }, [id]);

  if (loading) return <div className="loading-state">Loading product details...</div>;
  if (error || !product) return <div className="error-state">Product nahi mila!</div>;

  const productImages = product.images || [product.image, product.image, product.image];
  const productColors = product.colors || ["#313B2F", "#26433B", "#252B48"];
  const productSizes = product.sizes || ["Small", "Medium", "Large", "X-Large"];

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        Home &gt; Shop &gt; <span className="breadcrumb-current">{product.name}</span>
      </div>

      <div className="product-detail-wrapper">
        {/* Thumbnails & Main Image Gallery */}
        <div className="product-gallery-section">
          <div className="thumbnails-column">
            {productImages.map((img, index) => (
              <div 
                key={index}
                onClick={() => setMainImage(img)}
                className={`thumbnail-item ${mainImage === img ? 'active-thumb' : ''}`}
                style={{ border: mainImage === img ? '2px solid #000' : '2px solid transparent' }}
              >
                <img src={img} alt="" />
              </div>
            ))}
          </div>

          <div className="product-image-box">
            <img src={mainImage} alt={product.name} className="product-main-img" />
          </div>
        </div>

        {/* Product Info */}
        <div className="product-info-box">
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-rating">
            ★★★★☆ <span className="rating-count">{product.rating || '4.5/5'}</span>
          </p>
          
          <div className="product-detail-pricing">
            <span className="detail-current-price">{product.price}</span>
            {product.originalPrice && <span className="detail-original-price">{product.originalPrice}</span>}
            {product.discount && <span className="detail-discount-badge">{product.discount}</span>}
          </div>

          <p className="product-detail-desc">{product.description}</p>

          <hr className="product-divider" />

          {/* Select Colors Section */}
          <div className="selection-section">
            <p className="selection-label">Select Colors</p>
            <div className="color-options">
              {productColors.map((color, index) => (
                <div 
                  key={index}
                  onClick={() => setSelectedColor(index)}
                  className={`color-circle ${selectedColor === index ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                >
                  {selectedColor === index && <span className="color-check">✓</span>}
                </div>
              ))}
            </div>
          </div>

          <hr className="product-divider" />

          {/* Choose Size Section */}
          <div className="selection-section">
            <p className="selection-label">Choose Size</p>
            <div className="size-options">
              {productSizes.map((size) => (
                <button 
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <hr className="product-divider" />

          {/* Cart Action Section */}
          <div className="cart-action-section">
            <div className="quantity-selector">
              <span className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</span>
              <span className="qty-value">{quantity}</span>
              <span className="qty-btn" onClick={() => setQuantity(quantity + 1)}>+</span>
            </div>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        </div>
      </div>

      {/* Reviews Section Component Rendered Here */}
      <ProductReviews />

      {/* NewArrivals Component rendered here with updated title */}
      <NewArrivals 
        title="YOU MIGHT ALSO LIKE" 
        products={relatedProducts} 
        showDivider={false} 
      />
    </div>
  );
}