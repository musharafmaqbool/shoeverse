import React from 'react';
import styled from 'styled-components';
import ShoeCard from '../components/ShoeCard';
import { products } from '../data/products';

const PageContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 40px 20px;
  text-align: center;
  font-family: 'Poppins', sans-serif;
`;

const Heading = styled.h1`
  font-size: 3rem;
  margin-bottom: 40px;
`;

const Subtitle = styled.p`
  color: #888;
  font-size: 1.1rem;
  margin-bottom: 40px;
`;

const ShoeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Explore = () => {
  return (
    <PageContainer>
      <Heading>EXPLORE OUR SHOES</Heading>
      <Subtitle>Discover our latest collection of premium footwear</Subtitle>
      <ShoeGrid>
        {products.slice(0, 6).map(shoe => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </ShoeGrid>
    </PageContainer>
  );
};

export default Explore;
