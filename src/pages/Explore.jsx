import React from 'react';
import styled from 'styled-components';
import ShoeCard from '../components/ShoeCard'; // Import the ShoeCard component

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

const ShoeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* Responsive grid */
  gap: 30px;
  max-width: 1200px; /* Limit the grid width */
  margin: 0 auto; /* Center the grid */
`;

// Sample shoe data (replace with your actual data source later)
const sampleShoes = [
  { id: 1, name: 'Casual Sneaker', image: '/images/dummy-shoe1.png', originalPrice: '₹5,000', discountedPrice: '₹3,500' },
  { id: 2, name: 'Running Shoe', image: '/images/dummy-shoe2.png', originalPrice: '₹8,000', discountedPrice: '₹6,000' },
  { id: 3, name: 'Leather Loafer', image: '/images/dummy-shoe3.png', originalPrice: '₹6,500', discountedPrice: '₹4,800' },
  { id: 4, name: 'Basketball High-Top', image: '/images/dummy-shoe4.png', originalPrice: '₹9,500', discountedPrice: '₹7,000' },
  { id: 5, name: 'Trail Runner', image: '/images/dummy-shoe5.png', originalPrice: '₹7,000', discountedPrice: '₹5,500' },
  { id: 6, name: 'Skate Shoe', image: '/images/dummy-shoe6.png', originalPrice: '₹4,000', discountedPrice: '₹2,800' },
];

const Explore = () => {
  return (
    <PageContainer>
      <Heading>EXPLORE OUR SHOES</Heading>
      <ShoeGrid>
        {sampleShoes.map(shoe => (
          <ShoeCard key={shoe.id} shoe={shoe} />
        ))}
      </ShoeGrid>
    </PageContainer>
  );
};

export default Explore;
