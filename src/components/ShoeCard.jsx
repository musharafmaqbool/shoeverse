import React from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';

const CardContainer = styled.div`
  background-color: #333; /* Medium grey background */
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  text-align: center;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 180px; /* Fixed height for consistency */
  object-fit: cover; /* Cover the area without distorting aspect ratio */
  border-radius: 8px;
  margin-bottom: 15px;
`;

const ShoeName = styled.h3`
  margin: 0 0 5px 0;
  font-size: 1.3rem;
`;

const PriceInfo = styled.p`
  margin: 0;
  font-size: 1rem;
  margin-bottom: 15px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #ccc;
  margin-right: 8px;
  font-size: 0.9rem;
`;

const DiscountedPrice = styled.span`
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: auto; /* Push buttons to the bottom */
`;

const CardButton = styled.button`
  background-color: #fff;
  color: #000;
  padding: 8px 15px;
  border: none;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #eee;
  }
`;

const ShoeCard = ({ shoe }) => {
  const { addToCart } = useCart();

  const handleBuyNow = () => {
    // For now, Buy Now will also just add to cart.
    // A full implementation would involve navigation to cart/checkout.
    addToCart(shoe);
    // Optionally navigate to cart page:
    // navigate('/cart');
  };

  return (
    <CardContainer>
      <CardImage src={shoe.image} alt={shoe.name} />
      <ShoeName>{shoe.name}</ShoeName>
      <PriceInfo>
        <OriginalPrice>{shoe.originalPrice}</OriginalPrice>
        <DiscountedPrice>{shoe.discountedPrice}</DiscountedPrice>
      </PriceInfo>
      <ButtonContainer>
        <CardButton onClick={() => addToCart(shoe)}>Add to Cart</CardButton>
        <CardButton onClick={handleBuyNow}>Buy Now</CardButton>
      </ButtonContainer>
    </CardContainer>
  );
};

export default ShoeCard; 