import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const DELIVERY_FEE = 15;

// Simple demo promo code - not connected to a backend
const PROMO_CODES = {
  SAVE10: 0.10,
};

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoMessage, setPromoMessage] = useState('');

  // Original (pre-discount) price line ke liye - agar originalPrice na ho toh price hi use ho
  const lineOriginal = (item) => (item.originalPrice ?? item.price) * item.quantity;
  const lineCurrent = (item) => item.price * item.quantity;

  const subtotal = cartItems.reduce((sum, item) => sum + lineOriginal(item), 0);
  const productDiscount = cartItems.reduce(
    (sum, item) => sum + (lineOriginal(item) - lineCurrent(item)),
    0
  );
  const discountPercent = subtotal > 0 ? Math.round((productDiscount / subtotal) * 100) : 0;

  const promoDiscount = appliedPromo ? (subtotal - productDiscount) * appliedPromo : 0;
  const deliveryFee = cartItems.length > 0 ? DELIVERY_FEE : 0;
  const total = subtotal - productDiscount - promoDiscount + deliveryFee;

  const handleApplyPromo = () => {
    const code = promoCode.trim().toUpperCase();
    if (!code) {
      setPromoMessage('Pehle koi code likhein');
      return;
    }
    if (PROMO_CODES[code]) {
      setAppliedPromo(PROMO_CODES[code]);
      setPromoMessage(`Code "${code}" apply ho gaya! ✓`);
    } else {
      setAppliedPromo(null);
      setPromoMessage('Yeh promo code valid nahi hai');
    }
  };

  const fmt = (value) => `$${value.toFixed(0)}`;

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-breadcrumb">
          <Link to="/">Home</Link> <span>&gt;</span> <span className="breadcrumb-current">Cart</span>
        </div>
        <div className="cart-empty-state">
          <h2>Your cart is empty</h2>
          <p>Abhi tak aapne koi product cart mein add nahi kiya.</p>
          <Link to="/shop" className="continue-shopping-btn">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-breadcrumb">
        <Link to="/">Home</Link> <span>&gt;</span> <span className="breadcrumb-current">Cart</span>
      </div>

      <h1 className="cart-title">YOUR CART</h1>

      <div className="cart-layout">
        {/* Left: Cart Items */}
        <div className="cart-items-list">
          {cartItems.map((item) => (
            <div className="cart-item-card" key={item.cartId}>
              <div className="cart-item-image">
                <img src={item.image} alt={item.name} />
              </div>

              <div className="cart-item-main">
                <div className="cart-item-top">
                  <div>
                    <h3 className="cart-item-name">{item.name}</h3>
                    <div className="cart-item-meta">
                      {item.size && <span>Size: <span className="meta-value">{item.size}</span></span>}
                      {item.color && (
                        <span className="cart-item-color">
                          Color:
                          <span
                            className="color-swatch-small"
                            style={{ backgroundColor: item.color }}
                          ></span>
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    className="cart-delete-btn"
                    onClick={() => removeFromCart(item.cartId)}
                    aria-label="Remove item"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="3 6 5 6 21 6" />
                      <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    </svg>
                  </button>
                </div>

                <div className="cart-item-bottom">
                  <span className="cart-item-price">${item.price}</span>
                  <div className="cart-qty-selector">
                    <span
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                    >
                      -
                    </span>
                    <span className="qty-value">{item.quantity}</span>
                    <span
                      className="qty-btn"
                      onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                    >
                      +
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Order Summary */}
        <div className="order-summary-box">
          <h2 className="order-summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>{fmt(subtotal)}</span>
          </div>

          <div className="summary-row discount-row">
            <span>Discount (-{discountPercent}%)</span>
            <span>-{fmt(productDiscount)}</span>
          </div>

          {appliedPromo > 0 && (
            <div className="summary-row discount-row">
              <span>Promo ({Math.round(appliedPromo * 100)}%)</span>
              <span>-{fmt(promoDiscount)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Delivery Fee</span>
            <span>{fmt(deliveryFee)}</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-row summary-total">
            <span>Total</span>
            <span>{fmt(total)}</span>
          </div>

          <div className="promo-input-wrapper">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2">
              <path d="M20.59 13.41L11 3.83V2h1.83l9.58 9.59a2 2 0 0 1 0 2.82l-7 7a2 2 0 0 1-2.82 0L3 12.83V4h8.83" />
              <circle cx="6.5" cy="6.5" r="1.5" fill="#999" />
            </svg>
            <input
              type="text"
              placeholder="Add promo code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button className="promo-apply-btn" onClick={handleApplyPromo}>Apply</button>
          </div>
          {promoMessage && <p className="promo-message">{promoMessage}</p>}

          <button className="checkout-btn">
            Go to Checkout
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
