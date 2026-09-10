import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  // Initialize cart from localStorage for persistence across reloads & pages
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('aquas_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('aquas_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cartItems]);

  // Add to cart with quantity, checking if item already exists
  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    const productId = product.id || product._id;
    const productName = product.name || product.title || product.productName || 'Product';
    const productPrice = Number(product.price ?? product.wholesalePrice ?? 0);
    const productImage = product.image || product.imageUrl || '';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === productId || item._id === productId
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + qty,
        };
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: productId,
            _id: productId,
            name: productName,
            title: productName,
            price: productPrice,
            image: productImage,
            quantity: qty,
          },
        ];
      }
    });
  };

  // Remove item from cart by ID
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId && item._id !== productId)
    );
  };
  const removeItem = removeFromCart;

  // Update specific item quantity
  const updateQuantity = (productId, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty < 1) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId || item._id === productId
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Increase quantity by 1
  const increaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId || item._id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity by 1 (minimum 1)
  const decreaseQuantity = (productId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === productId || item._id === productId) {
          return { ...item, quantity: Math.max(1, item.quantity - 1) };
        }
        return item;
      })
    );
  };

  // Clear all items in cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculations
  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);
  const cartTotal = cartItems.reduce(
    (acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
  const subtotal = cartTotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        removeItem,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        cartTotal,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
};