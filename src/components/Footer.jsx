import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #121212; /* Dark grey background, slightly lighter than page */
  color: #fff;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
  margin-top: 40px; /* Space above the footer */
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterText = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterText>&copy; 2023 Step In Style. All rights reserved.</FooterText>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 