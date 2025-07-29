import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaMinus, FaPlus, FaShoppingBag } from 'react-icons/fa';
import PhoneVerificationModal from '../components/PhoneVerificationModal';
import toast from 'react-hot-toast';

const PageContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const CartHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const CartContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CartItemsContainer = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 20px;
  border-bottom: 1px solid #333;
  background-color: #2a2a2a;
  border-radius: 8px;
  margin-bottom: 15px;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h3`
  margin: 0 0 8px 0;
  font-size: 1.2rem;
`;

const ItemSize = styled.p`
  color: #888;
  font-size: 14px;
  margin: 0 0 8px 0;
`;

const ItemPrice = styled.p`
  font-weight: bold;
  font-size: 1.1rem;
  margin: 0;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityButton = styled.button`
  width: 35px;
  height: 35px;
  border: 2px solid #333;
  border-radius: 6px;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.1rem;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
`;

const RemoveButton = styled.button`
  padding: 8px 12px;
  background-color: #ff6b6b;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #ff5252;
  }
`;

const EmptyCart = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #888;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: #333;
`;

const OrderSummary = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  height: fit-content;
`;

const SummaryTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 14px;

  &:last-child {
    font-weight: bold;
    font-size: 18px;
    padding-top: 15px;
    border-top: 1px solid #333;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 15px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 20px;

  &:hover {
    background-color: #dddddd;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      updateQuantity(item.id, item.selectedSize, newQuantity);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedSize);
  };

  const handleCheckout = () => {
    setShowPhoneModal(true);
  };

  const handlePhoneVerificationSuccess = (phoneNumber) => {
    navigate('/checkout');
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.discountedPrice * item.quantity), 0);
  const shipping = cartItems.length > 0 ? 500 : 0; // ₹500 shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  return (
    <PageContainer>
      <CartHeader>
        <Title>Shopping Cart</Title>
        <Subtitle>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</Subtitle>
      </CartHeader>

      <CartContent>
        <CartItemsContainer>
          {cartItems.length === 0 ? (
            <EmptyCart>
              <EmptyIcon>
                <FaShoppingBag />
              </EmptyIcon>
              <h3>Your cart is empty</h3>
              <p>Start shopping to add items to your cart</p>
            </EmptyCart>
          ) : (
            cartItems.map((item, index) => (
              <CartItem key={`${item.id}-${item.selectedSize}-${index}`}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemSize>Size: {item.selectedSize}</ItemSize>
                  <ItemPrice>₹{item.discountedPrice.toLocaleString()}</ItemPrice>
                </ItemDetails>
                <QuantityControls>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item, -1)}
                    disabled={item.quantity <= 1}
                  >
                    <FaMinus />
                  </QuantityButton>
                  <QuantityDisplay>{item.quantity}</QuantityDisplay>
                  <QuantityButton
                    onClick={() => handleQuantityChange(item, 1)}
                    disabled={item.quantity >= 10}
                  >
                    <FaPlus />
                  </QuantityButton>
                </QuantityControls>
                <RemoveButton onClick={() => handleRemoveItem(item)}>
                  <FaTrash />
                  Remove
                </RemoveButton>
              </CartItem>
            ))
          )}
        </CartItemsContainer>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          <SummaryRow>
            <span>Subtotal ({cartItems.length} items)</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Shipping</span>
            <span>₹{shipping.toLocaleString()}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Tax (18% GST)</span>
            <span>₹{tax.toLocaleString()}</span>
          </SummaryRow>
          <SummaryRow>
            <span>Total</span>
            <span>₹{total.toLocaleString()}</span>
          </SummaryRow>
          <CheckoutButton onClick={handleCheckout} disabled={cartItems.length === 0}>
            <FaShoppingBag />
            Proceed to Checkout
          </CheckoutButton>
        </OrderSummary>
      </CartContent>

      <PhoneVerificationModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSuccess={handlePhoneVerificationSuccess}
        actionType="checkout"
      />
    </PageContainer>
  );
};

export default Cart; 