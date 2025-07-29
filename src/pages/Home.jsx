import React, { useState, useRef, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaShoppingCart, FaHeart, FaShare, FaCheckCircle } from 'react-icons/fa'; // Import icons
import { useCart } from '../contexts/CartContext'; // Corrected import path to 'contexts' (plural)

// Assuming you have a logo image in your public folder - this will likely be used in Header.jsx now
// const logoPath = '/logoooo.jpg'; // Moved/handled by Header component

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #000000; /* Black background as in the image */
  color: #ffffff; /* White text */
  overflow-x: hidden; /* Hide horizontal scrollbar */
  position: relative; /* Needed for absolute positioning of vertical text and potentially footer */
  min-height: 100vh; /* Ensure HomeContainer takes at least full viewport height */
  cursor: default; /* Set default cursor */
`;

const VerticalText = styled.div`
  position: absolute;
  left: 1rem; /* Adjust positioning as needed */
  top: 50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: left center;
  font-size: 1.5rem;
  font-weight: bold;
  color: #333333; /* Dark grey color for subtle effect */
  text-transform: uppercase;
  white-space: nowrap; /* Prevent text wrapping */
  z-index: 1; /* Ensure text is above other content */
`;

const MainContentArea = styled.div`
  display: flex;
  flex: 1; /* Allows this area to take up remaining vertical space */
  padding-left: 4rem; /* Space for vertical text */
  width: 100%;
  min-height: calc(100vh - 60px); /* Adjust based on header height, ensure it takes most of the screen */
  align-items: center; /* Vertically center the content inside */
  justify-content: center; /* Horizontally center the content inside */
`;

const LeftContent = styled.div`
  width: 300px; /* Fixed width for left section */
  padding: 2rem;
  display: flex;
  flex-direction: column; /* Items stacked vertically */
  align-items: center; /* Align content to the center for logo/text alignment */
  justify-content: center; /* Center content vertically in LeftContent */
`;

const Logo = styled.img`
  width: 200px; /* Increased logo width */
  height: auto;
  margin-bottom: 0.5rem; /* Reduced margin to bring it closer to the text */
`;

const CompanyName = styled.h2`
  font-size: 2.5rem;
  color: #ffffff;
  margin-bottom: 1rem;
  text-align: center; /* Center the text */
`;

const Tagline = styled.p`
  font-size: 1.2rem;
  color: #b0b0b0;
  line-height: 1.6;
  text-align: center; /* Center the tagline text */
`;

const RightContent = styled.div`
  flex: 1; /* Right side takes remaining width */
  display: flex;
  align-items: center; /* Vertically align carousel and details */
  justify-content: center; /* Horizontally center content */
  padding: 2rem;
  position: relative;
`;

const CarouselContainer = styled.div`
  width: 60%; /* Adjust width of carousel */
  max-width: 800px;
  position: relative; /* Needed for arrow positioning */
`;

const StyledSlider = styled(Slider)`
  .slick-slide {
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .slick-prev, .slick-next {
    z-index: 1;
    width: 40px;
    height: 40px;
  }

  .slick-prev {
    left: -50px;
  }

  .slick-next {
    right: -50px;
  }

  .slick-prev:before, .slick-next:before {
    color: #ffffff;
    font-size: 40px;
  }

  .slick-dots {
     display: none !important;
  }
`;

const SlideImage = styled.img`
  max-width: 100%;
  max-height: 500px; /* Adjust max height as needed */
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`;

const ShoeDetailsCard = styled.div`
  width: 300px; /* Fixed width for the details card */
  margin-left: 3rem; /* Space between carousel and card */
  padding: 2rem;
  background-color: #1a1a1a; /* Darker background for the card */
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const ShoeTitle = styled.h1`
  font-size: 3rem; /* Adjust font size for card */
  margin-bottom: 0.5rem;
  text-align: center; /* Center title */
`;

const ShoeModel = styled.h2`
  font-size: 1.5rem; /* Adjust font size for card */
  color: #b0b0b0;
  margin-bottom: 1rem;
  text-align: center; /* Center model */
`;

const ShoePrice = styled.p`
  font-size: 1.8rem; /* Adjust font size for card */
  font-weight: bold;
  margin-bottom: 1rem;
  text-align: center; /* Center price */
`;

const ShoeDescription = styled.p`
  font-size: 0.9rem; /* Adjust font size for card */
  color: #b0b0b0;
  margin-bottom: 1.5rem;
  text-align: center; /* Center description */
`;

const AddToCartButton = styled.button`
  padding: 0.8rem 1.5rem; /* Adjust padding */
  font-size: 1rem;
  background-color: #ffffff;
  color: #000000;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  align-self: center; /* Center button */
  margin-bottom: 1.5rem; /* Add space below button */

  &:hover {
    background-color: #dddddd;
  }
`;

const ActionIcons = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center; /* Center icons */
  
  svg {
    font-size: 1.5rem;
    color: #ffffff;
    cursor: pointer;
    transition: color 0.3s ease;
    
    &:hover {
      color: #b0b0b0;
    }
  }
`;

const Footer = styled.footer`
  background-color: #111111;
  color: #ffffff;
  padding: 2rem;
  width: 100%;
  position: fixed; /* Use fixed to position relative to viewport */
  bottom: 0;
  left: 0;
  transform: translateY(100%); /* Initially hidden below the screen */
  transition: transform 0.5s ease-in-out;
  z-index: 10; /* Ensure footer is above other content when visible */
  pointer-events: none; /* Allow clicks to pass through when hidden */
`;

const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
`;

const FooterSection = styled.div`
  flex: 1;
  padding: 0 1rem;
  
  h3 {
    color: #ffffff;
    margin-bottom: 1rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    
    li {
      margin-bottom: 0.5rem;
      color: #b0b0b0;
      cursor: pointer;
      
      &:hover {
        color: #ffffff;
      }
    }
  }
`;

// Keyframes for fade in and slide up animation
const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// Keyframes for fade out and slide down animation
const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(20px);
  }
`;

const PopupMessage = styled.div`
  position: fixed;
  bottom: 80px; /* Position above the potential footer */
  left: 50%;
  transform: translateX(-50%);
  background-color: #4CAF50; /* Green background */
  color: white;
  padding: 15px 20px;
  border-radius: 5px;
  z-index: 1000; /* Ensure it's on top of everything */
  display: flex;
  align-items: center;
  gap: 10px; /* Space between icon and text */
  animation: ${fadeIn} 0.5s ease-out, ${fadeOut} 0.5s ease-out 2.5s forwards; /* Fade in, stay, then fade out */
`;

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showFooter, setShowFooter] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // State for the popup message
  const containerRef = useRef(null); // Ref for the HomeContainer

  const { addToCart } = useCart(); // Use the useCart hook to get the addToCart function

  // Effect to add and clean up mousemove listener for footer
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (event) => {
      const containerRect = container.getBoundingClientRect();
      // Calculate distance from the bottom edge of the container
      const distanceToBottom = containerRect.bottom - event.clientY;
      const sensitivity = 100; // Adjust this value (in pixels) to control the hover area size

      // Show footer if mouse is within the sensitivity area from the bottom
      if (distanceToBottom < sensitivity && distanceToBottom >= 0) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
  };

  // Sample carousel data - **ASSUMING** images are in /public/images/
  // Update these paths if your images are located elsewhere
  const carouselData = [
    {
      id: 1,
      image: '/images/shoe1-removebg-preview.png',
      title: 'Nike',
      model: 'Nike air max 1',
      price: '₹2,500',
      description: 'Original thrifted Nike Air Max 1 in excellent condition. Perfect for daily wear and casual outings.',
    },
    {
      id: 2,
      image: '/images/shoe2-removebg-preview.png',
      title: 'Nike',
      model: 'Nike vomero 17',
      price: '₹2,500',
      description: 'Authentic thrifted Nike Vomero 17. Great for running and athletic activities.',
    },
    {
      id: 3,
      image: '/images/shoe3-removebg-preview.png',
      title: 'Nike',
      model: 'Nike invincible run 3',
      price: '₹2,500',
      description: 'Original thrifted Nike Invincible Run 3. Premium comfort and style.',
    },
    {
      id: 4,
      image: '/images/shoe4-removebg-preview.png',
      title: 'Puma',
      model: 'Puma nitro forever future',
      price: '₹2,500',
      description: 'Authentic thrifted Puma Nitro Forever Future. Perfect for sports and casual wear.',
    },
    {
      id: 5,
      image: '/images/shoe5-removebg-preview.png',
      title: 'Adidas',
      model: 'Adidas ultra boost',
      price: '₹2,500',
      description: 'Original thrifted Adidas Ultra Boost. Exceptional comfort and performance.',
    },
    {
      id: 6,
      image: '/images/shoe6-removebg-preview.png',
      title: 'Crocs',
      model: 'Crocs lite ride',
      price: '₹2,500',
      description: 'Authentic thrifted Crocs Lite Ride. Perfect for casual and comfortable wear.',
    },
  ];

  // Function to handle adding the current shoe to the cart
  const handleAddToCart = () => {
    const currentShoe = carouselData[currentSlide];
    addToCart(currentShoe); // Use the addToCart function from the context

    // Show the popup message
    setShowPopup(true);

    // Hide the popup message after 3 seconds
    setTimeout(() => {
      setShowPopup(false);
    }, 3000); // 3000 milliseconds = 3 seconds
  };

  return (
    <HomeContainer ref={containerRef}> {/* Attach the ref to the container */}
      <VerticalText>STEP IN STYLE</VerticalText>
      
      {/* Main content area */}
      <MainContentArea>
        {/* Left side: Logo and Tagline */}
        <LeftContent>
          <Logo
            src="/logoooo.jpg"
            alt="Company Logo"
            onError={(e) => {
              console.error(`Failed to load logo image: ${e.target.src}`);
              e.target.style.display = 'none';
            }}
          />
          <CompanyName>Thrifted Kicks</CompanyName>
          <Tagline>We sell original thrifted shoes at affordable prices. Quality footwear for everyone.</Tagline>
        </LeftContent>

        {/* Right side: Carousel and Shoe Details Card */}
        <RightContent>
          {/* Carousel */}
          <CarouselContainer>
            <StyledSlider {...settings}>
              {carouselData.map((slide) => (
                <div key={slide.id}>
                  <SlideImage 
                    src={slide.image} 
                    alt={slide.title}
                    onError={(e) => {
                      console.error(`Failed to load image: ${slide.image}`);
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              ))}
            </StyledSlider>
          </CarouselContainer>

          {/* Shoe Details Card */}
          {carouselData.length > 0 && (
            <ShoeDetailsCard>
              <ShoeTitle>{carouselData[currentSlide].title}</ShoeTitle>
              <ShoeModel>{carouselData[currentSlide].model}</ShoeModel>
              <ShoePrice>{carouselData[currentSlide].price}</ShoePrice>
              <ShoeDescription>{carouselData[currentSlide].description}</ShoeDescription>
              <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
              <ActionIcons>
                <FaHeart />
                <FaShare />
              </ActionIcons>
            </ShoeDetailsCard>
          )}
        </RightContent>
      </MainContentArea>

      {/* Popup Message */}
      {showPopup && (
        <PopupMessage>
          <FaCheckCircle /> Item added to cart successfully!
        </PopupMessage>
      )}

      {/* Footer */}
      <Footer style={{ transform: showFooter ? 'translateY(0)' : 'translateY(100%)', pointerEvents: showFooter ? 'auto' : 'none' }}>
        <FooterContent>
          <FooterSection>
            <h3>About Us</h3>
            <ul>
              <li>Our Story</li>
              <li>Mission</li>
              <li>Contact</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Customer Service</h3>
            <ul>
              <li>Shipping Policy</li>
              <li>Returns & Exchanges</li>
              <li>FAQ</li>
            </ul>
          </FooterSection>
          <FooterSection>
            <h3>Connect With Us</h3>
            <ul>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Twitter</li>
            </ul>
          </FooterSection>
        </FooterContent>
      </Footer>
    </HomeContainer>
  );
};

export default Home;