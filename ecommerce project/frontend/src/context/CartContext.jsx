import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);
const CART_STORAGE_KEY = 'shopco_cart_items';

// "$120" -> 120, "$1,240" -> 1240
function parsePrice(price) {
  if (typeof price === 'number') return price;
  const parsed = parseFloat(String(price).replace(/[^0-9.]/g, ''));
  return isNaN(parsed) ? 0 : parsed;
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart ko localStorage mein save karte rahein taake refresh par khali na ho
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
    } catch {
      // storage full ya disabled - ignore karein, app crash nahi hona chahiye
    }
  }, [cartItems]);

  // Same product + same size + same color -> quantity barhao, warna naya item add karein
  const addToCart = (product, options = {}) => {
    const { size = null, color = null, quantity = 1 } = options;
    const cartId = `${product.id}-${size || 'default'}-${color || 'default'}`;

    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartId === cartId);

      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prev,
        {
          cartId,
          id: product.id,
          name: product.name,
          image: product.image,
          price: parsePrice(product.price),
          originalPrice: product.originalPrice ? parsePrice(product.originalPrice) : null,
          size,
          color,
          quantity,
        },
      ];
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prev) => prev.filter((item) => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, quantity) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item.cartId === cartId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}
