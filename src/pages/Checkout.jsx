import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { FaCreditCard, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_your_stripe_publishable_key');

const CheckoutContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const CheckoutGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const CheckoutSection = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &::placeholder {
    color: #888;
  }
`;

const StripeCardElement = styled.div`
  padding: 12px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: #2a2a2a;
  transition: border-color 0.3s ease;

  &:focus-within {
    border-color: #ffffff;
  }
`;

const OrderSummary = styled.div`
  background-color: #1a1a1a;
  border-radius: 10px;
  padding: 30px;
  height: fit-content;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid #333;

  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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
  font-size: 14px;
`;

const ItemQuantity = styled.span`
  color: #888;
  font-size: 14px;
`;

const PriceBreakdown = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 2px solid #333;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 14px;

  &:last-child {
    font-weight: bold;
    font-size: 18px;
    margin-top: 15px;
    padding-top: 15px;
    border-top: 1px solid #333;
  }
`;

const PayButton = styled.button`
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
  margin-top: 20px;

  &:hover {
    background-color: #dddddd;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const { cartItems, removeFromCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: currentUser?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const subtotal = cartItems.reduce((sum, item) => sum + (item.discountedPrice * (item.quantity || 1)), 0);
  const shipping = 500; // ₹500 shipping
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      toast.error('Stripe not loaded');
      return;
    }

    setLoading(true);

    try {
      // Create payment intent on your backend
      const response = await fetch('http://localhost:5000/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: total,
          currency: 'inr',
          items: cartItems
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create payment intent');
      }

      const { client_secret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
          },
        },
      });

      if (error) {
        toast.error(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        toast.success('Payment successful!');
        // Clear cart and redirect to order confirmation
        navigate('/order-confirmation', { 
          state: { 
            orderId: paymentIntent.id,
            items: cartItems,
            total: total
          }
        });
      }
    } catch (error) {
      toast.error('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CheckoutContainer>
      <CheckoutGrid>
        <CheckoutSection>
          <SectionTitle>Shipping Information</SectionTitle>
          <Form onSubmit={handleSubmit}>
            <FormRow>
              <InputGroup>
                <Label>
                  <FaUser />
                  First Name
                </Label>
                <Input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>
                  <FaUser />
                  Last Name
                </Label>
                <Input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </FormRow>

            <FormRow>
              <InputGroup>
                <Label>
                  <FaEnvelope />
                  Email
                </Label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>
                  <FaPhone />
                  Phone
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </FormRow>

            <InputGroup>
              <Label>
                <FaMapMarkerAlt />
                Address
              </Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <FormRow>
              <InputGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
              <InputGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                />
              </InputGroup>
            </FormRow>

            <InputGroup>
              <Label>ZIP Code</Label>
              <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                required
              />
            </InputGroup>

            <SectionTitle>Payment Information</SectionTitle>
            <InputGroup>
              <Label>
                <FaCreditCard />
                Card Details
              </Label>
              <StripeCardElement>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#ffffff',
                        '::placeholder': {
                          color: '#888',
                        },
                      },
                    },
                  }}
                />
              </StripeCardElement>
            </InputGroup>

            <PayButton type="submit" disabled={loading || !stripe}>
              {loading ? 'Processing...' : `Pay ₹${total.toLocaleString()}`}
            </PayButton>
          </Form>
        </CheckoutSection>

        <OrderSummary>
          <SectionTitle>Order Summary</SectionTitle>
          {cartItems.map((item, index) => (
            <OrderItem key={index}>
              <ItemInfo>
                <ItemImage src={item.image} alt={item.name} />
                <ItemDetails>
                  <ItemName>{item.name}</ItemName>
                  <ItemPrice>₹{item.discountedPrice.toLocaleString()}</ItemPrice>
                </ItemDetails>
              </ItemInfo>
              <ItemQuantity>Qty: {item.quantity || 1}</ItemQuantity>
            </OrderItem>
          ))}

          <PriceBreakdown>
            <PriceRow>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Shipping</span>
              <span>₹{shipping.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Tax (18% GST)</span>
              <span>₹{tax.toLocaleString()}</span>
            </PriceRow>
            <PriceRow>
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </PriceRow>
          </PriceBreakdown>
        </OrderSummary>
      </CheckoutGrid>
    </CheckoutContainer>
  );
};

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Checkout; 