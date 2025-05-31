import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => item.id === shoe.id);
      if (existingItem) {
        // If item already exists, increase quantity (assuming shoes have a unique ID)
        // Note: Our current shoe data doesn't have IDs, we should add them or use name as key.
        // For now, let's assume a simple add - a more robust solution would handle quantity.
        return [...prevItems, { ...shoe, quantity: 1 }]; // Simple add for now
      } else {
        // If item doesn't exist, add it with quantity 1
         return [...prevItems, { ...shoe, quantity: 1 }]; // Simple add for now
      }
    });
     // Temporary alert for feedback - remove later
     alert(`${shoe.name} added to cart!`);
  };

   const removeFromCart = (shoeId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== shoeId));
     // Temporary alert for feedback - remove later
     alert('Item removed from cart!');
  };

  // We can add updateQuantity later if needed
  // const updateQuantity = (shoeId, quantity) => { ... };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}; 