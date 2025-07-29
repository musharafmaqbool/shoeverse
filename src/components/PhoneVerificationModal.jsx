import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPhone, FaTimes, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const BackButton = styled.button`
  position: absolute;
  top: 15px;
  left: 15px;
  background: none;
  border: none;
  color: #888;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 5px;

  &:hover {
    color: #ffffff;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.5rem;
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
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

const OTPInput = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
`;

const OTPDigit = styled.input`
  width: 50px;
  height: 50px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #ffffff;
  font-size: 20px;
  text-align: center;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #dddddd;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const ResendButton = styled.button`
  background: none;
  border: none;
  color: #888;
  font-size: 14px;
  cursor: pointer;
  text-decoration: underline;
  margin-top: 10px;

  &:hover {
    color: #ffffff;
  }

  &:disabled {
    color: #666;
    cursor: not-allowed;
    text-decoration: none;
  }
`;

const Timer = styled.div`
  text-align: center;
  color: #888;
  font-size: 14px;
  margin-top: 10px;
`;

const PhoneVerificationModal = ({ isOpen, onClose, onSuccess, actionType }) => {
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [timer, setTimer] = useState(0);
  const [canResend, setCanResend] = useState(true);

  if (!isOpen) return null;

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      toast.error('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    try {
      // Call backend API to send OTP
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send OTP');
      }

      toast.success('OTP sent to your phone number!');
      setStep('otp');
      setTimer(30);
      setCanResend(false);
      
      // Start countdown timer
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      toast.error(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return; // Only allow single digit
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.querySelector(`input[data-index="${index + 1}"]`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 4) {
      toast.error('Please enter complete OTP');
      return;
    }

    setLoading(true);
    try {
      // Call backend API to verify OTP
      const response = await fetch('http://localhost:5000/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp: otpString })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Invalid OTP');
      }

      toast.success('Phone number verified successfully!');
      onSuccess(phoneNumber);
      handleClose();
    } catch (error) {
      toast.error(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      // Call backend API to resend OTP
      const response = await fetch('http://localhost:5000/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to resend OTP');
      }
      
      toast.success('OTP resent successfully!');
      setTimer(30);
      setCanResend(false);
      
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

    } catch (error) {
      toast.error(error.message || 'Failed to resend OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep('phone');
    setPhoneNumber('');
    setOtp(['', '', '', '']);
    setLoading(false);
    setTimer(0);
    setCanResend(true);
    onClose();
  };

  const handleBack = () => {
    setStep('phone');
    setOtp(['', '', '', '']);
  };

  const getActionText = () => {
    switch (actionType) {
      case 'addToCart': return 'Add to Cart';
      case 'buyNow': return 'Buy Now';
      case 'checkout': return 'Proceed to Checkout';
      case 'addPhone': return 'Add Phone Number';
      default: return 'Continue';
    }
  };

  return (
    <ModalOverlay onClick={handleClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={handleClose}>
          <FaTimes />
        </CloseButton>
        
        {step === 'otp' && (
          <BackButton onClick={handleBack}>
            <FaArrowLeft />
            Back
          </BackButton>
        )}

        <Title>
          {step === 'phone' ? 'Enter Phone Number' : 'Enter OTP'}
        </Title>

        {step === 'phone' ? (
          <Form onSubmit={handlePhoneSubmit}>
            <InputGroup>
              <Label>
                <FaPhone />
                Phone Number
              </Label>
              <Input
                type="tel"
                placeholder="Enter your phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </InputGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
          </Form>
        ) : (
          <Form onSubmit={handleOTPSubmit}>
            <InputGroup>
              <Label>Enter 4-digit OTP sent to {phoneNumber}</Label>
              <OTPInput>
                {otp.map((digit, index) => (
                  <OTPDigit
                    key={index}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    data-index={index}
                    required
                  />
                ))}
              </OTPInput>
            </InputGroup>
            <Button type="submit" disabled={loading}>
              {loading ? 'Verifying...' : getActionText()}
            </Button>
            <ResendButton 
              onClick={handleResendOTP} 
              disabled={!canResend || loading}
            >
              Resend OTP
            </ResendButton>
            {timer > 0 && (
              <Timer>Resend available in {timer} seconds</Timer>
            )}
          </Form>
        )}
      </ModalContent>
    </ModalOverlay>
  );
};

export default PhoneVerificationModal; 