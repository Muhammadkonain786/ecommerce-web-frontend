export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        {/* Top 5 Columns Grid */}
        <div className="footer-grid">
          
          {/* 1. Brand Column */}
          <div className="footer-col brand-col">
            <h2 className="footer-logo">SHOP.CO</h2>
            <p className="footer-desc">
              We have clothes that suits your style and which you're proud to wear. From women to men.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.37 14.5 5 15.5 5H18V0h-3.808C10.59 0 9 1.581 9 4.75V8z"/></svg>
              </a>
              <a href="#" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="social-icon-btn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
              </a>
            </div>
          </div>

          {/* 2. Company */}
          <div className="footer-col">
            <h3 className="footer-title">COMPANY</h3>
            <ul className="footer-links">
              <li><a href="#">About</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Works</a></li>
              <li><a href="#">Career</a></li>
            </ul>
          </div>

          {/* 3. Help */}
          <div className="footer-col">
            <h3 className="footer-title">HELP</h3>
            <ul className="footer-links">
              <li><a href="#">Customer Support</a></li>
              <li><a href="#">Delivery Details</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
            </ul>
          </div>

          {/* 4. FAQ */}
          <div className="footer-col">
            <h3 className="footer-title">FAQ</h3>
            <ul className="footer-links">
              <li><a href="#">Account</a></li>
              <li><a href="#">Manage Deliveries</a></li>
              <li><a href="#">Orders</a></li>
              <li><a href="#">Payments</a></li>
            </ul>
          </div>

          {/* 5. Resources */}
          <div className="footer-col">
            <h3 className="footer-title">RESOURCES</h3>
            <ul className="footer-links">
              <li><a href="#">Free eBooks</a></li>
              <li><a href="#">Development Tutorial</a></li>
              <li><a href="#">How to - Blog</a></li>
              <li><a href="#">Youtube Playlist</a></li>
            </ul>
          </div>

        </div>

        <hr className="footer-divider" />

        {/* Bottom Bar */}
       <div className="footer-bottom">
          <p className="copyright">Shop.co © 2000-2023, All Rights Reserved</p>
          <div className="payment-icons">
            {/* Visa */}
            <div className="pay-badge">
              <svg width="24" height="16" viewBox="0 0 38 24" fill="none"><path d="M14.248 23.015h-4.303l2.69-16.51h4.302l-2.689 16.51zM24.877 6.945c-.845-.314-2.17-.655-3.834-.655-4.227 0-7.202 2.213-7.227 5.378-.025 2.339 2.115 3.641 3.73 4.414 1.666.792 2.227 1.302 2.219 2.012-.012 1.088-1.332 1.583-2.565 1.583-1.724 0-2.646-.263-4.053-.868l-.568-.255-.6 3.52c1.025.467 2.915.868 4.877.884 4.603 0 7.603-2.181 7.641-5.556.02-1.851-1.127-3.268-3.596-4.413-1.492-.731-2.408-1.222-2.398-1.968.01-.67.747-1.385 2.368-1.385 1.344-.026 2.316.273 3.069.589l.366.172.548-3.376zM32.062 6.435h-3.323c-1.028 0-1.796.287-2.246 1.339l-6.388 15.241h4.512l.9-2.483h5.512l.526 2.483h3.979l-3.494-16.58zm-5.074 10.518l2.15-5.889 1.233 5.889h-3.383zM9.012 6.505L4.743 17.58l-.462-2.34C3.525 12.632 1.645 10.151 0 8.761l4.47 14.254h4.632l6.879-16.51h-4.969z" fill="#1434CB"/></svg>
            </div>

            {/* Mastercard */}
            <div className="pay-badge">
              <svg width="24" height="16" viewBox="0 0 38 24" fill="none"><circle cx="15" cy="12" r="9" fill="#EB001B"/><circle cx="23" cy="12" r="9" fill="#F79E1B"/><path d="M19 5.894a9.003 9.003 0 000 12.212 9.003 9.003 0 000-12.212z" fill="#FF5F00"/></svg>
            </div>

            {/* PayPal */}
            <div className="pay-badge">
              <svg width="24" height="16" viewBox="0 0 38 24" fill="none"><path d="M11.5 6.5H7.3c-.3 0-.6.2-.7.5l-2.3 14.5c0 .2.2.4.4.4h3.1c.3 0 .6-.2.7-.5l.6-3.8c.1-.3.3-.5.7-.5h1.7c3.1 0 5.4-1.5 6-4.5.4-1.9-.1-3.3-1.3-4.3-.9-.8-2.3-1.3-4.2-1.3z" fill="#003087"/><path d="M13.2 9.1c-1.4 0-2.5.1-3.1.2-.2 0-.4.2-.4.4l-1.4 9c0 .1 0 .2.1.3.1.1.2.2.4.2h2.5c.3 0 .5-.2.6-.5l.4-2.6c0-.2.2-.4.5-.4h1.1c2.4 0 4.2-1.1 4.7-3.4.3-1.4-.1-2.5-1.1-3.2-.8-.6-2.1-.6-4.3-.6z" fill="#0079C1"/></svg>
            </div>

           {/* Apple Pay */}
            <div className="pay-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#000' }}>Apple</span>
              <svg width="20" height="14" viewBox="0 0 38 24" fill="none"><path d="M16.9 7.6c-.4.5-1 1-1.6 1-.1-.7.3-1.4.7-1.8.4-.4 1.1-.9 1.6-1 .1.8-.3 1.5-.7 1.8zm2.4 1.6c-.8 0-1.5.4-1.9.4-.4 0-1-.4-1.7-.4-.9 0-1.7.5-2.2 1.3-1 1.7-.3 4.2.7 5.6.5.7 1 1.5 1.7 1.5.7 0 1-.4 1.9-.4s1.2.4 1.9.4c.7 0 1.2-.7 1.7-1.4.5-.8.8-1.6.8-1.6s-1.5-.6-1.5-2.4c0-1.5 1.2-2.2 1.3-2.3-.7-1-1.8-1.1-2.2-1.2zm-1.3-4.2c.4-.5.6-1.1.5-1.7-.5 0-1.1.3-1.5.8-.4.4-.7 1-.6 1.6.6.1 1.2-.2 1.6-.7z" fill="#000"/></svg>
            </div>

            {/* Google Pay */}
            <div className="pay-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '10px', fontWeight: '600', color: '#5F6368' }}>Google</span>
              <svg width="20" height="14" viewBox="0 0 38 24" fill="none"><path d="M17.5 10.3h-3.4v3.4h3.4v-3.4z" fill="#34A853"/><path d="M17.5 7.6h-3.4v2.7h3.4V7.6z" fill="#4285F4"/><path d="M10.8 10.3H7.4v3.4h3.4v-3.4z" fill="#FBBC05"/><path d="M10.8 7.6H7.4v2.7h3.4V7.6z" fill="#EA4335"/><path d="M21.2 9.5h-3.7v4.8h1.4v-1.8h2.3c1.3 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3zm0 3.2h-2.3v-1.8h2.3c.5 0 .9.4.9.9s-.4.9-.9.9z" fill="#5F6368"/></svg>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}