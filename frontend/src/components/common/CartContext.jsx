import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from 'react';

const CartContext = createContext(null);

const API_URL = 'http://localhost:5000/api/cart';

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Get logged-in user's token
  const getToken = () => {
    return localStorage.getItem('token');
  };

  // Headers for authenticated requests
  const authHeaders = () => {
    const token = getToken();

    return {
      'Content-Type': 'application/json',
      ...(token && {
        Authorization: `Bearer ${token}`,
      }),
    };
  };

  // Convert backend cart format to frontend format
  const mapCart = (cart) => {
    if (!cart || !Array.isArray(cart.items)) {
      return [];
    }

    return cart.items.map((item) => ({
      id: item.product,
      name: item.productName,
      price: Number(item.unitPrice) || 0,
      quantity: Number(item.quantity) || 0,
    }));
  };

  // =========================
  // GET CART
  // =========================
  const fetchCart = async () => {
    const token = getToken();

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: 'GET',
        headers: authHeaders(),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch cart: ${response.status}`);
      }

      const data = await response.json();

      setCartItems(mapCart(data));
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart when application starts
  useEffect(() => {
    fetchCart();
  }, []);

  // =========================
  // ADD TO CART
  // =========================
  const addToCart = async (product) => {
    const token = getToken();

    if (!token) {
      console.error('User is not logged in.');
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/items`, {
        method: 'POST',
        headers: authHeaders(),
        body: JSON.stringify({
          productId: product._id,
          quantity: 1,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || 'Failed to add product to cart'
        );
      }

      const data = await response.json();

      setCartItems(mapCart(data));

      return data;
    } catch (error) {
      console.error('Failed to add item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UPDATE QUANTITY
  // =========================
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) {
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'PUT',
        headers: authHeaders(),
        body: JSON.stringify({
          quantity,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || 'Failed to update quantity'
        );
      }

      const data = await response.json();

      setCartItems(mapCart(data));

      return data;
    } catch (error) {
      console.error('Failed to update quantity:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // INCREASE QUANTITY
  // =========================
  const increaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) {
      return;
    }

    await updateQuantity(id, item.quantity + 1);
  };

  // =========================
  // DECREASE QUANTITY
  // =========================
  const decreaseQuantity = async (id) => {
    const item = cartItems.find((item) => item.id === id);

    if (!item) {
      return;
    }

    // Don't allow quantity below 1
    if (item.quantity > 1) {
      await updateQuantity(id, item.quantity - 1);
    }
  };

  // =========================
  // REMOVE ITEM
  // =========================
  const removeItem = async (id) => {
    try {
      setLoading(true);

      const response = await fetch(`${API_URL}/items/${id}`, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || 'Failed to remove item'
        );
      }

      const data = await response.json();

      setCartItems(mapCart(data));

      return data;
    } catch (error) {
      console.error('Failed to remove item:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CLEAR CART
  // =========================
  const clearCart = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: authHeaders(),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        throw new Error(
          errorData.message || 'Failed to clear cart'
        );
      }

      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // CART COUNT
  // =========================
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // =========================
  // SUBTOTAL
  // =========================
  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // =========================
  // CONTEXT
  // =========================
  return (
    <CartContext.Provider
      value={{
        cartItems,
        loading,

        fetchCart,
        addToCart,

        updateQuantity,
        increaseQuantity,
        decreaseQuantity,

        removeItem,
        clearCart,

        cartCount,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =========================
// USE CART HOOK
// =========================
export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      'useCart must be used inside a CartProvider'
    );
  }

  return context;
};