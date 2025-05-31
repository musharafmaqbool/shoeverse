import React from 'react';
import styled from 'styled-components';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

const PageContainer = styled.div`
  min-height: calc(100vh - 60px); /* Adjust for header height */
  background-color: #212121; /* Dark grey background */
  color: #fff; /* White text */
  padding: 40px 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 40px;
`;

const ContactContent = styled.div`
  max-width: 600px; /* Limit content width */
  margin: 0 auto;
  text-align: left;
  background-color: #333; /* Medium grey background for content block */
  padding: 30px;
  border-radius: 8px;
`;

const ContactInfo = styled.div`
  margin-bottom: 30px;

  p {
    font-size: 1.1rem;
    margin-bottom: 10px;

    strong {
      margin-right: 10px;
    }
  }
`;

const SocialLinksContainer = styled.div`
  margin-top: 20px;
  margin-bottom: 30px; /* Space below social links */
  text-align: center; /* Center the social icons */
`;

const SocialIconLink = styled.a`
  color: #fff; /* White icons */
  font-size: 2rem; /* Icon size */
  margin: 0 15px; /* Space between icons */
  transition: color 0.3s ease;

  &:hover {
    color: #ccc; /* Lighter color on hover */
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;

  input, textarea {
    padding: 10px;
    border-radius: 4px;
    border: 1px solid #555;
    background-color: #444;
    color: #fff;
    font-family: 'Poppins', sans-serif;
  }

  button {
    background-color: #000; /* Black button */
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #555;
    }
  }
`;

const Contact = () => {
  return (
    <PageContainer>
      <Heading>CONTACT US</Heading>
      <ContactContent>
        <ContactInfo>
          <p><strong>Email:</strong> info@shoestore.com</p>
          <p><strong>Phone:</strong> (123) 456-7890</p>
          <p><strong>Address:</strong> 123 Shoe Lane, Sneakertown, ST 12345</p>
        </ContactInfo>

        <SocialLinksContainer>
          <SocialIconLink href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <FaInstagram />
          </SocialIconLink>
          <SocialIconLink href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <FaFacebook />
          </SocialIconLink>
          <SocialIconLink href="https://www.twitter.com/" target="_blank" rel="noopener noreferrer">
            <FaTwitter />
          </SocialIconLink>
        </SocialLinksContainer>

        <ContactForm>
          <h3>Send us a message</h3>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message" rows="5"></textarea>
          <button type="submit">Send Message</button>
        </ContactForm>
      </ContactContent>
    </PageContainer>
  );
};

export default Contact; 