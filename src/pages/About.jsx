import React from 'react';
import styled from 'styled-components';

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

const AboutContent = styled.div`
  max-width: 800px; /* Limit content width */
  margin: 0 auto;
  text-align: left;
  background-color: #333; /* Medium grey background for content block */
  padding: 30px;
  border-radius: 8px;

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  h3 {
    font-size: 1.8rem;
    margin-top: 30px;
    margin-bottom: 15px;
  }
`;

const About = () => {
  return (
    <PageContainer>
      <Heading>ABOUT US</Heading>
      <AboutContent>
        <p>
          Welcome to Step In Style, your ultimate destination for finding the perfect pair of shoes.
          Founded in [Year], our mission has always been to provide high-quality, stylish, and comfortable footwear for every occasion.
        </p>
        <p>
          We believe that the right pair of shoes can not only complete an outfit but also empower you to step confidently through life.
          Our curated collection features a wide range of styles, from athletic sneakers and sturdy boots to elegant dress shoes and casual sandals, sourced from trusted brands around the world.
        </p>
        <h3>Our Mission</h3>
        <p>
          To offer an unparalleled shoe shopping experience by providing a diverse selection, exceptional customer service, and a commitment to quality and style.
          We aim to be the go-to online store for footwear enthusiasts seeking both fashion and comfort.
        </p>
        {/* Add more sections like Our Team, Our Values, etc. here */}
      </AboutContent>
    </PageContainer>
  );
};

export default About; 