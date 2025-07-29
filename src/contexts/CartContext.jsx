import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (shoe) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(item => 
        item.id === shoe.id && item.selectedSize === shoe.selectedSize
      );
      
      if (existingItem) {
        // If item already exists with same size, increase quantity
        return prevItems.map(item => 
          item.id === shoe.id && item.selectedSize === shoe.selectedSize
            ? { ...item, quantity: item.quantity + (shoe.quantity || 1) }
            : item
        );
      } else {
        // If item doesn't exist, add it with quantity
        return [...prevItems, { ...shoe, quantity: shoe.quantity || 1 }];
      }
    });
  };

  const updateQuantity = (itemId, selectedSize, newQuantity) => {
    setCartItems((prevItems) => 
      prevItems.map(item => 
        item.id === itemId && item.selectedSize === selectedSize
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

   const removeFromCart = (itemId, selectedSize) => {
    setCartItems((prevItems) => 
      prevItems.filter(item => !(item.id === itemId && item.selectedSize === selectedSize))
    );
  };

  // We can add updateQuantity later if needed
  // const updateQuantity = (shoeId, quantity) => { ... };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}; 