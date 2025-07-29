import React from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBox, FaTruck, FaHome, FaShoppingBag } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ConfirmationContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ConfirmationCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 40px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const SuccessIcon = styled.div`
  font-size: 4rem;
  color: #4CAF50;
  margin-bottom: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
  color: #ffffff;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 30px;
`;

const OrderDetails = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  margin: 20px 0;
  text-align: left;
`;

const OrderInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;

  &:last-child {
    margin-bottom: 0;
    font-weight: bold;
    font-size: 16px;
    padding-top: 10px;
    border-top: 1px solid #333;
  }
`;

const OrderItems = styled.div`
  margin: 20px 0;
`;

const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 10px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 8px;
`;

const ItemDetails = styled.div`
  flex: 1;
`;

const ItemName = styled.h4`
  margin: 0 0 5px 0;
  font-size: 14px;
`;

const ItemPrice = styled.span`
  color: #888;
  font-size: 12px;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 30px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &.primary {
    background-color: #ffffff;
    color: #000000;

    &:hover {
      background-color: #dddddd;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #ffffff;
    border: 2px solid #333;

    &:hover {
      border-color: #ffffff;
      background-color: #333;
    }
  }
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background-color: #333;
    z-index: 1;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const StepIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.active ? '#4CAF50' : '#333'};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  color: #ffffff;
`;

const StepLabel = styled.span`
  font-size: 12px;
  color: ${props => props.active ? '#ffffff' : '#888'};
  text-align: center;
`;

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderId, items, total } = location.state || {};

  if (!orderId) {
    navigate('/');
    return null;
  }

  const handleContinueShopping = () => {
    navigate('/products');
  };

  const handleViewOrders = () => {
    navigate('/orders');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <ConfirmationContainer>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ConfirmationCard>
          <SuccessIcon>
            <FaCheckCircle />
          </SuccessIcon>
          
          <Title>Order Confirmed!</Title>
          <Subtitle>Thank you for your purchase. Your order has been successfully placed.</Subtitle>

          <OrderDetails>
            <OrderInfo>
              <span>Order ID:</span>
              <span>{orderId}</span>
            </OrderInfo>
            <OrderInfo>
              <span>Order Date:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </OrderInfo>
            <OrderInfo>
              <span>Payment Status:</span>
              <span style={{ color: '#4CAF50' }}>Paid</span>
            </OrderInfo>
            <OrderInfo>
              <span>Total Amount:</span>
              <span>₹{total?.toLocaleString()}</span>
            </OrderInfo>
          </OrderDetails>

          <OrderItems>
            <h3>Order Items:</h3>
            {items?.map((item, index) => (
              <OrderItem key={index}>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>₹{item.discountedPrice?.toLocaleString()}</ItemPrice>
                </ItemDetails>
                <span>Qty: {item.quantity || 1}</span>
              </OrderItem>
            ))}
          </OrderItems>

          <ProgressSteps>
            <Step>
              <StepIcon active>
                <FaCheckCircle />
              </StepIcon>
              <StepLabel active>Order Placed</StepLabel>
            </Step>
            <Step>
              <StepIcon>
                <FaBox />
              </StepIcon>
              <StepLabel>Processing</StepLabel>
            </Step>
            <Step>
              <StepIcon>
                <FaTruck />
              </StepIcon>
              <StepLabel>Shipped</StepLabel>
            </Step>
            <Step>
              <StepIcon>
                <FaCheckCircle />
              </StepIcon>
              <StepLabel>Delivered</StepLabel>
            </Step>
          </ProgressSteps>

          <ButtonGroup>
            <Button className="primary" onClick={handleContinueShopping}>
              <FaShoppingBag />
              Continue Shopping
            </Button>
            <Button className="secondary" onClick={handleViewOrders}>
              <FaBox />
              View Orders
            </Button>
            <Button className="secondary" onClick={handleGoHome}>
              <FaHome />
              Go Home
            </Button>
          </ButtonGroup>
        </ConfirmationCard>
      </motion.div>
    </ConfirmationContainer>
  );
};

export default OrderConfirmation; 