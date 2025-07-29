import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

const SignupContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const SignupCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 450px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 30px;
  font-size: 2rem;
  color: #ffffff;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px;
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

const PasswordToggle = styled.button`
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  font-size: 16px;
`;

const SignupButton = styled.button`
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

  &:hover {
    background-color: #dddddd;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #888;

  &::before,
  &::after {
    content: '';
    flex: 1;
    height: 1px;
    background-color: #333;
  }

  span {
    padding: 0 15px;
  }
`;

const SocialButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: transparent;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    border-color: #ffffff;
    background-color: #333;
  }
`;

const LoginLink = styled.div`
  text-align: center;
  margin-top: 20px;
  color: #888;

  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ErrorMessage = styled.div`
  color: #ff6b6b;
  font-size: 14px;
  text-align: center;
  margin-top: 10px;
`;

const PasswordRequirements = styled.div`
  font-size: 12px;
  color: #888;
  margin-top: 5px;
`;

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validatePassword = (password) => {
    const minLength = password.length >= 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return minLength && hasUpperCase && hasLowerCase && hasNumbers;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (!validatePassword(formData.password)) {
      setError('Password must be at least 6 characters with uppercase, lowercase, and numbers');
      return;
    }

    setLoading(true);

    try {
      await signup(formData.email, formData.password, formData.displayName);
      toast.success('Account created successfully!');
      navigate('/');
    } catch (error) {
      setError('Failed to create account. Please try again.');
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    toast.error('Google signup not implemented yet');
  };

  const handleFacebookSignup = () => {
    toast.error('Facebook signup not implemented yet');
  };

  return (
    <SignupContainer>
      <SignupCard>
        <Title>Create Account</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="text"
              name="displayName"
              placeholder="Full Name"
              value={formData.displayName}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
            <PasswordRequirements>
              Password must be at least 6 characters with uppercase, lowercase, and numbers
            </PasswordRequirements>
          </InputGroup>

          <InputGroup>
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <SignupButton type="submit" disabled={loading}>
            {loading ? 'Creating Account...' : 'Create Account'}
          </SignupButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SocialButton onClick={handleGoogleSignup}>
          <FaGoogle />
          Continue with Google
        </SocialButton>

        <SocialButton onClick={handleFacebookSignup}>
          <FaFacebook />
          Continue with Facebook
        </SocialButton>

        <LoginLink>
          Already have an account? <Link to="/login">Login</Link>
        </LoginLink>
      </SignupCard>
    </SignupContainer>
  );
};

export default Signup; 