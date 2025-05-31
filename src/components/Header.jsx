import React, { useState } from 'react';
import styled from 'styled-components';
import { FiSearch } from 'react-icons/fi'; // Import search icon
import { BsBag } from 'react-icons/bs'; // Import bag icon
import { AiOutlineMenu } from 'react-icons/ai'; // Import menu icon
import { Link } from 'react-router-dom'; // Import Link
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaShoppingCart, FaUser } from 'react-icons/fa'; // Import FaUser icon
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../contexts/CartContext.jsx'; // Corrected import path with .jsx extension

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between; /* Distribute space */
  align-items: center;
  padding: 10px 40px;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  position: relative;
  z-index: 30; /* Ensure header is above other potential overlays */

  @media (max-width: 768px) {
    flex-direction: column; /* Stack items vertically on smaller screens */
    padding: 10px 20px;
  }
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  flex-grow: 1; /* Allow left section to grow */

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between; /* Space out logo and menu icon on mobile */
    margin-bottom: 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 60px; /* Keep height same */
  width: auto; /* Allow width to adjust proportionally */
  max-width: 250px; /* Adjust max width for horizontal scaling */
  display: block;

  @media (max-width: 768px) {
    height: 40px; /* Adjusted height for mobile */
    max-width: 180px; /* Adjusted max width for mobile */
  }
`;

const NavMenu = styled.nav`
   display: flex; /* Show nav links by default on larger screens */
   justify-content: center; /* Center navigation links */
   flex-grow: 1; /* Allow nav to take available space in the center */

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 25px;
  }

  a {
    text-decoration: none;
    color: #fff;
    font-weight: bold;
    font-size: 1rem;
    font-family: 'Poppins', sans-serif;
    &:hover {
      text-decoration: underline;
    }
  }

   @media (max-width: 768px) {
     display: none; /* Hide on smaller screens when menu icon is shown */
   }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 30px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #ccc;
  }
`;

// Styled component for the mobile menu dropdown/sidebar
const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 10;
  }
`;

const MenuIcon = styled.div`
  color: #fff;
  font-size: 2rem;
  cursor: pointer;
`;

const MobileNavLinks = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 60px; /* Adjust based on header height */
  left: 0;
  width: 100%;
  background-color: #121212; /* Dark background */
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);

  a {
    color: #fff;
    text-decoration: none;
    font-size: 1.2rem;
    padding: 10px 0;
    border-bottom: 1px solid #333;

    &:last-child {
      border-bottom: none;
    }

    &:hover {
      color: #ccc;
    }
  }
`;

const IconsContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  z-index: 20;
`;

const Icon = styled.div`
  cursor: pointer;
  font-size: 1.5rem;
  color: #fff;
  transition: color 0.3s ease; /* Add transition for smooth hover effect */

  &:hover {
    color: #ccc; /* Change color on hover */
  }
`;

const MenuIconContainer = styled.div`
  display: none; /* Hide menu icon by default */
  align-items: center;
  cursor: pointer;
  font-size: 1.8rem; /* Larger icon size */
  z-index: 20;

  @media (max-width: 768px) {
      display: flex; /* Show menu icon on smaller screens */
  }
`;

const SearchInputContainer = styled(motion.div)`
  width: 100%;
  padding: 10px 40px;
  background-color: #1a1a1a; /* Slightly lighter black */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  max-width: 600px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #333; /* Darker input background */
  color: #fff; /* White text color */
  &::placeholder {
    color: #ccc; /* Lighter placeholder text */
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff; /* White outline on focus */
  }
`;

// Placeholder styled component for the User Login Interface
const UserLoginInterface = styled(motion.div)`
  position: absolute;
  top: 100%; /* Position below the header */
  right: 0; /* Align to the right */
  width: 300px; /* Set a width for the interface */
  background-color: #1a1a1a; /* Dark background */
  color: #fff;
  padding: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.5);
  z-index: 25; /* Ensure it's below the header but above main content */
  display: flex;
  flex-direction: column;
  gap: 15px; /* Space between form elements */
`;

const Input = styled.input`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
  font-size: 1rem;

  &::placeholder {
    color: #ccc;
  }
`;

const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #fff;
  color: #000;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #ddd;
  }
`;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Renamed state variable
  const [isSearchOpen, setIsSearchOpen] = useState(false); // State for search input
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user login interface

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsSearchOpen(false); // Close search when opening menu
    setIsUserMenuOpen(false); // Close user menu when opening menu
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsMenuOpen(false); // Close menu when opening search
    setIsUserMenuOpen(false); // Close user menu when opening search
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
    setIsMenuOpen(false); // Close menu when opening user menu
    setIsSearchOpen(false); // Close search when opening user menu
  };

  const menuItems = [
    { name: 'HOME', link: '/' },
    { name: 'EXPLORE', link: '/explore' },
    { name: 'ABOUT', link: '/about' },
    { name: 'CONTACT', link: '/contact' },
  ];

  return (
    <>
      <HeaderContainer>
        <HeaderLeft>
          <Logo>
            <LogoImage src="/logoooo.jpg" alt="Step In Style Logo" />
          </Logo>
          <NavMenu> {/* Desktop Navigation */}
              <ul>
                {menuItems.map((item) => (
                  <li key={item.name}>
                    <Link to={item.link}>{item.name}</Link>
                  </li>
                ))}
              </ul>
            </NavMenu>
        </HeaderLeft>

        <IconsContainer>
          <Icon onClick={toggleSearch}><FiSearch /></Icon> {/* Add onClick handler */}
          <Link to="/cart"><Icon><BsBag /></Icon></Link>
          <Icon onClick={toggleUserMenu}>
            <FaUser />
          </Icon> {/* Added onClick handler */}
          <MenuIconContainer onClick={toggleMenu}>
             <AiOutlineMenu />
           </MenuIconContainer>
        </IconsContainer>

        {/* Mobile Menu */}
        <MobileMenu>
          <MenuIcon onClick={toggleMenu}>
            {isMenuOpen ? <IoClose /> : <IoMenu />}
          </MenuIcon>
          <AnimatePresence>
            {isMenuOpen && (
              <MobileNavLinks
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {menuItems.map((item) => (
                  <Link key={item.name} to={item.link} onClick={toggleMenu}>
                    {item.name}
                  </Link>
                ))}
              </MobileNavLinks>
            )}
          </AnimatePresence>
        </MobileMenu>
      </HeaderContainer>
      <AnimatePresence>
        {isSearchOpen && (
          <SearchInputContainer
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <SearchInput type="text" placeholder="Search for shoes..." />
          </SearchInputContainer>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header; 