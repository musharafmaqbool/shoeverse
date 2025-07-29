import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import PhoneVerificationModal from './PhoneVerificationModal';
import toast from 'react-hot-toast';

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
  height: 180px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 15px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
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
  const navigate = useNavigate();
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const handleAddToCart = () => {
    setPendingAction('addToCart');
    setShowPhoneModal(true);
  };

  const handleBuyNow = () => {
    setPendingAction('buyNow');
    setShowPhoneModal(true);
  };

  const handlePhoneVerificationSuccess = (phoneNumber) => {
    if (pendingAction === 'addToCart') {
      addToCart(shoe);
      toast.success(`${shoe.name} added to cart!`);
    } else if (pendingAction === 'buyNow') {
      addToCart(shoe);
      navigate('/checkout');
    }
    setPendingAction(null);
  };

  return (
    <>
      <CardContainer>
        <Link to={`/product/${shoe.id}`}>
          <CardImage src={shoe.image} alt={shoe.name} />
        </Link>
        <ShoeName>{shoe.name}</ShoeName>
        <PriceInfo>
          <OriginalPrice>₹{shoe.originalPrice.toLocaleString()}</OriginalPrice>
          <DiscountedPrice>₹{shoe.discountedPrice.toLocaleString()}</DiscountedPrice>
        </PriceInfo>
        <ButtonContainer>
          <CardButton onClick={handleAddToCart}>Add to Cart</CardButton>
          <CardButton onClick={handleBuyNow}>Buy Now</CardButton>
        </ButtonContainer>
      </CardContainer>

      <PhoneVerificationModal
        isOpen={showPhoneModal}
        onClose={() => {
          setShowPhoneModal(false);
          setPendingAction(null);
        }}
        onSuccess={handlePhoneVerificationSuccess}
        actionType={pendingAction}
      />
    </>
  );
};

export default ShoeCard; 