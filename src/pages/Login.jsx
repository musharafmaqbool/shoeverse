import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import toast from 'react-hot-toast';

const LoginContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const LoginCard = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
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

const LoginButton = styled.button`
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

const SignupLink = styled.div`
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

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      toast.success('Successfully logged in!');
      navigate('/');
    } catch (error) {
      setError('Failed to log in. Please check your credentials.');
      toast.error('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    toast.error('Google login not implemented yet');
  };

  const handleFacebookLogin = () => {
    toast.error('Facebook login not implemented yet');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Welcome Back</Title>
        <Form onSubmit={handleSubmit}>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <PasswordToggle
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </PasswordToggle>
          </InputGroup>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <LoginButton type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </LoginButton>
        </Form>

        <Divider>
          <span>or</span>
        </Divider>

        <SocialButton onClick={handleGoogleLogin}>
          <FaGoogle />
          Continue with Google
        </SocialButton>

        <SocialButton onClick={handleFacebookLogin}>
          <FaFacebook />
          Continue with Facebook
        </SocialButton>

        <SignupLink>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </SignupLink>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login; 