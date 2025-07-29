import React from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaBox, FaTruck, FaCheckCircle, FaClock, FaEye } from 'react-icons/fa';

const OrdersContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const OrdersHeader = styled.div`
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

const OrdersGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  gap: 20px;
`;

const OrderCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #333;
`;

const OrderId = styled.h3`
  font-size: 1.2rem;
  margin: 0;
`;

const OrderDate = styled.span`
  color: #888;
  font-size: 14px;
`;

const OrderStatus = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: bold;
  background-color: ${props => {
    switch (props.status) {
      case 'delivered': return '#4CAF50';
      case 'shipped': return '#2196F3';
      case 'processing': return '#FF9800';
      default: return '#333';
    }
  }};
  color: #ffffff;
`;

const OrderItems = styled.div`
  margin-bottom: 15px;
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
  width: 60px;
  height: 60px;
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

const OrderTotal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 15px;
  border-top: 1px solid #333;
  font-weight: bold;
`;

const ViewButton = styled.button`
  padding: 8px 16px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background-color: #dddddd;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #888;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  color: #333;
`;

const Orders = () => {
  const { currentUser, userProfile } = useAuth();
  const navigate = useNavigate();

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  // Mock orders data - in a real app, this would come from the database
  const mockOrders = [
    {
      id: 'ORD-001',
      date: '2024-01-15',
      status: 'delivered',
      total: 12500,
      items: [
        { name: 'Nike Air Max 270', price: 7500, quantity: 1, image: '/images/shoe1-removebg-preview.png' },
        { name: 'Adidas Ultraboost 22', price: 5000, quantity: 1, image: '/images/shoe2-removebg-preview.png' }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-10',
      status: 'shipped',
      total: 8900,
      items: [
        { name: 'Puma RS-X', price: 6000, quantity: 1, image: '/images/shoe3-removebg-preview.png' },
        { name: 'Converse Chuck Taylor', price: 2900, quantity: 1, image: '/images/shoe4-removebg-preview.png' }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-05',
      status: 'processing',
      total: 15800,
      items: [
        { name: 'New Balance 990v5', price: 9800, quantity: 1, image: '/images/shoe5-removebg-preview.png' },
        { name: 'Reebok Classic Leather', price: 6000, quantity: 1, image: '/images/shoe6-removebg-preview.png' }
      ]
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <FaCheckCircle />;
      case 'shipped': return <FaTruck />;
      case 'processing': return <FaClock />;
      default: return <FaBox />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'delivered': return 'Delivered';
      case 'shipped': return 'Shipped';
      case 'processing': return 'Processing';
      default: return 'Pending';
    }
  };

  return (
    <OrdersContainer>
      <OrdersHeader>
        <Title>My Orders</Title>
        <Subtitle>Track your order history and current orders</Subtitle>
      </OrdersHeader>

      {mockOrders.length > 0 ? (
        <OrdersGrid>
          {mockOrders.map((order) => (
            <OrderCard key={order.id}>
              <OrderHeader>
                <div>
                  <OrderId>{order.id}</OrderId>
                  <OrderDate>{new Date(order.date).toLocaleDateString()}</OrderDate>
                </div>
                <OrderStatus status={order.status}>
                  {getStatusIcon(order.status)}
                  {getStatusText(order.status)}
                </OrderStatus>
              </OrderHeader>

              <OrderItems>
                {order.items.map((item, index) => (
                  <OrderItem key={index}>
                    <ItemImage src={item.image} alt={item.name} />
                    <ItemDetails>
                      <ItemName>{item.name}</ItemName>
                      <ItemPrice>₹{item.price.toLocaleString()}</ItemPrice>
                    </ItemDetails>
                    <span>Qty: {item.quantity}</span>
                  </OrderItem>
                ))}
              </OrderItems>

              <OrderTotal>
                <span>Total: ₹{order.total.toLocaleString()}</span>
                <ViewButton>
                  <FaEye />
                  View Details
                </ViewButton>
              </OrderTotal>
            </OrderCard>
          ))}
        </OrdersGrid>
      ) : (
        <EmptyState>
          <EmptyIcon>
            <FaBox />
          </EmptyIcon>
          <h3>No Orders Yet</h3>
          <p>Start shopping to see your orders here</p>
        </EmptyState>
      )}
    </OrdersContainer>
  );
};

export default Orders; 