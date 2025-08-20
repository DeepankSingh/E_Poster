import React, { createContext, useContext, useState, useEffect } from 'react';

interface CartItem {
  id: number;
  title: string;
  image: string;
  price: number;
  size?: string;
  quantity: number;
  category: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeFromCart: (id: number, size?: string) => void;
  updateQuantity: (id: number, quantity: number, size?: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item: Omit<CartItem, 'quantity'>, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(cartItem => 
        cartItem.id === item.id && cartItem.size === item.size
      );
      
      if (existingItem) {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.size === item.size
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prev, { ...item, quantity }];
    });
  };

  const removeFromCart = (id: number, size?: string) => {
    setCartItems(prev => 
      prev.filter(item => !(item.id === id && item.size === size))
    );
  };

  const updateQuantity = (id: number, quantity: number, size?: string) => {
    if (quantity <= 0) {
      removeFromCart(id, size);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};