import React from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { IoCartSharp } from 'react-icons/io5';

const CarouselContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  overflow: hidden;
  background-color: #000; /* Black background to blend with theme */
  border: none;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  /* Removed fixed height for horizontal carousel */

  .slick-prev, .slick-next {
    z-index: 1;
    /* Position arrows vertically centered */
    top: 50%;
    transform: translateY(-50%);
    bottom: auto; /* Override bottom positioning */

    &:before {
        font-size: 20px;
        color: white;
    }
  }

  .slick-prev {
      left: 10px;
  }

  .slick-next {
      right: 10px;
  }

  .slick-dots {
    bottom: 10px;
  }

  .slick-dots li button:before {
    color: white;
  }
`;

const SlideContent = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 30px;
  padding: 20px;
  width: 100%; /* Ensure takes full width */
  box-sizing: border-box; /* Include padding in dimensions */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack vertically on smaller screens */
    gap: 20px;
  }
`;

const ImageContainer = styled.div`
  flex: 1 1 auto; /* Flex grow, shrink, and auto basis */
  max-width: 50%;
  display: flex;
  justify-content: center;
  align-items: center; /* Center image vertically */
  box-sizing: border-box;

  img {
      display: block;
      max-width: 100%;
      height: auto; /* Allow height to adjust */
      object-fit: contain;
  }

  @media (max-width: 768px) {
    max-width: 80%;
  }
`;

const TextContainer = styled(motion.div)`
  flex: 1 1 auto;
  text-align: left; /* Keep text left-aligned */
  color: #fff;
  font-family: 'Poppins', sans-serif;
  max-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  align-items: flex-start; /* Align items to the left */

  @media (max-width: 768px) {
    text-align: left; /* Align text left on smaller screens */
    max-width: 100%;
    align-items: flex-start; /* Align items left on smaller screens */
  }
`;

const ShoeName = styled.h3`
  margin: 0 0 10px 0;
  font-size: 1.8rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const PriceInfo = styled.p`
  margin: 0;
  font-size: 1.2rem;
  margin-bottom: 20px; /* Add space below price */

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #ccc;
  margin-right: 10px;
  font-size: 1rem;
`;

const DiscountedPrice = styled.span`
  color: #fff;
  font-weight: bold;
`;

const AddToCartButton = styled.button`
  background-color: transparent;
  color: #fff; /* White icon color */
  border: none;
  padding: 0; /* Remove default button padding */
  margin-top: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.4); /* Slightly larger scale on hover */
  }

  svg {
    width: 50px; /* Increased icon size */
    height: 50px; /* Increased icon size */
  }
`;

// Customizable shoe data with local image paths and prices (in Rupees)
const shoes = [
  { id: 1, name: 'Nike Air Max', image: '/images/shoe1-removebg-preview.png', originalPrice: '₹9,000', discountedPrice: '₹7,500' },
  { id: 2, name: 'Adidas Ultraboost', image: '/images/shoe2-removebg-preview.png', originalPrice: '₹13,500', discountedPrice: '₹10,500' },
  { id: 3, name: 'Puma Rider', image: '/images/shoe3-removebg-preview.png', originalPrice: '₹7,500', discountedPrice: '₹6,000' },
  { id: 4, name: 'Converse Chuck Taylor', image: '/images/shoe4-removebg-preview.png', originalPrice: '₹4,500', discountedPrice: '₹3,800' },
  { id: 5, name: 'New Balance 990', image: '/images/shoe5-removebg-preview.png', originalPrice: '₹12,800', discountedPrice: '₹9,800' },
  { id: 6, name: 'Reebok Classic', image: '/images/shoe6-removebg-preview.png', originalPrice: '₹6,000', discountedPrice: '₹4,900' },
];

const ShoeCarousel = () => {
  const { addToCart } = useCart();

  const settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    // Removed vertical settings
    cssEase: 'ease-in-out'
  };

  // Animation for the entire slide content (adjusted for horizontal)
  const slideVariants = {
    initial: { opacity: 0, x: 100 }, // Start invisible and to the right
    animate: { opacity: 1, x: 0, transition: { duration: 0.8, ease: 'easeOut' } }, // Fade in and slide left
    exit: { opacity: 0, x: -100, transition: { duration: 0.6, ease: 'easeIn' } } // Fade out and slide left
  };

  // You can keep imageVariants or rely on slideVariants
  const imageVariants = {
    initial: { opacity: 0, rotateY: 90, scale: 0.8 },
    animate: { opacity: 1, rotateY: 0, scale: 1, transition: { duration: 1, ease: 'easeOut' } },
    exit: { opacity: 0, rotateY: -90, scale: 0.8, transition: { duration: 0.8, ease: 'easeIn' } }
  };

  return (
    <CarouselContainer>
      <Slider {...settings}>
        {shoes.map((shoe, index) => (
          <div key={index}> {/* Removed fixed height for horizontal slide */}
            <SlideContent
              variants={slideVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ImageContainer>
                {/* Apply image-specific animations if desired */}
                <motion.img
                  src={shoe.image}
                  alt={shoe.name}
                  variants={imageVariants} /* Using image variants */
                  initial="initial"
                  animate="animate"
                  exit="exit"
                />
              </ImageContainer>
              <TextContainer>
                <ShoeName>{shoe.name}</ShoeName>
                <PriceInfo>
                  <OriginalPrice>{shoe.originalPrice}</OriginalPrice>
                  <DiscountedPrice>{shoe.discountedPrice}</DiscountedPrice>
                </PriceInfo>
                <AddToCartButton onClick={() => addToCart(shoe)}>
                  <IoCartSharp />
                </AddToCartButton>
              </TextContainer>
            </SlideContent>
          </div>
        ))}
      </Slider>
    </CarouselContainer>
  );
};

export default ShoeCarousel; 