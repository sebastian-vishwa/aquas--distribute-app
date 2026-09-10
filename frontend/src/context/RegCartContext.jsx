import React, { createContext, useContext, useState, useEffect } from 'react';

const RegCartContext = createContext(null);

export function RegCartProvider({ children }) {
  // Initialize from unique localStorage key 'reg_cus_cart'
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem('reg_cus_cart');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Failed to load registered customer cart:', e);
      return [];
    }
  });

  // Persist to localStorage whenever cartItems changes
  useEffect(() => {
    try {
      localStorage.setItem('reg_cus_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save registered customer cart:', e);
    }
  }, [cartItems]);

  // Add to cart with quantity
  const addToCart = (item, quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    const itemId = item.id || item._id;
    const itemName = item.productName || item.name || item.title || 'Product';
    const itemPrice = Number(item.wholesalePrice ?? item.price ?? 0);
    const itemImage = item.image || item.imageUrl || '';
    const itemUnit = item.unit || 'unit';

    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (i) => i.id === itemId || i._id === itemId
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
            id: itemId,
            _id: itemId,
            name: itemName,
            productName: itemName,
            price: itemPrice,
            wholesalePrice: itemPrice,
            image: itemImage,
            unit: itemUnit,
            quantity: qty,
          },
        ];
      }
    });
  };

  // Update item quantity
  const updateQuantity = (itemId, newQuantity) => {
    const qty = Number(newQuantity);
    if (qty < 1) {
      removeFromCart(itemId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId || item._id === itemId
          ? { ...item, quantity: qty }
          : item
      )
    );
  };

  // Increase quantity by 1
  const increaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId || item._id === itemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity by 1 (minimum 1, or remove if reaches 0)
  const decreaseQuantity = (itemId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) => {
          if (item.id === itemId || item._id === itemId) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove from cart
  const removeFromCart = (itemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== itemId && item._id !== itemId)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Calculate total price
  const getCartTotal = () => {
    return cartItems.reduce(
      (acc, item) => acc + (Number(item.price || item.wholesalePrice || 0) * Number(item.quantity || 0)),
      0
    );
  };

  const cartTotal = getCartTotal();
  const subtotal = cartTotal;
  const cartCount = cartItems.reduce((acc, item) => acc + (Number(item.quantity) || 0), 0);

  return (
    <RegCartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        removeItem: removeFromCart,
        clearCart,
        getCartTotal,
        cartTotal,
        subtotal,
        cartCount,
      }}
    >
      {children}
    </RegCartContext.Provider>
  );
}

// Custom hook
export const useRegCart = () => {
  const context = useContext(RegCartContext);
  if (!context) {
    throw new Error('useRegCart must be used within a RegCartProvider');
  }
  return context;
};

// Default export
export default RegCartContext;
