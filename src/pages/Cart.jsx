import React from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext'; // Import useCart hook

const PageContainer = styled.div`
  min-height: calc(100vh - 60px); /* Adjust for header height */
  background-color: #212121; /* Dark grey background */
  color: #fff; /* White text */
  padding: 40px 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 40px;
`;

const CartItemsContainer = styled.div`
  max-width: 800px; /* Limit width of cart items list */
  margin: 0 auto;
  text-align: left;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  background-color: #333; /* Medium grey background for item */
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  gap: 20px;

  img {
    width: 80px; /* Fixed image width */
    height: 80px; /* Fixed image height */
    object-fit: cover;
    border-radius: 4px;
  }

  div {
    flex-grow: 1; /* Allow text content to grow */
  }

  h3 {
    margin: 0 0 5px 0;
    font-size: 1.2rem;
  }

  p {
    margin: 0;
    font-size: 1rem;
    color: #ccc; /* Grey out price slightly */
  }

  button {
    background-color: #e74c3c; /* Red button for remove */
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    cursor: pointer;
    font-size: 0.9rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #c0392b;
    }
  }
`;

const EmptyCartMessage = styled.p`
  font-size: 1.2rem;
  color: #ccc;
`;

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // Use the hook to get cart items and remove function

  return (
    <PageContainer>
      <Heading>SHOPPING CART</Heading>
      <CartItemsContainer>
        {cartItems.length === 0 ? (
          <EmptyCartMessage>Your shopping cart is empty.</EmptyCartMessage>
        ) : (
          cartItems.map(item => (
            <CartItem key={item.id}> {/* Assuming shoe data has a unique ID */}
              <img src={item.image} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>{item.discountedPrice}</p> {/* Display discounted price in cart */}
              </div>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </CartItem>
          ))
        )}
      </CartItemsContainer>
    </PageContainer>
  );
};

export default Cart; 