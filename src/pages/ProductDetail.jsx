import React, { useState } from 'react';
import styled from 'styled-components';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../data/products';
import { useCart } from '../contexts/CartContext';
import { FaStar, FaShoppingCart, FaHeart, FaShare, FaArrowLeft } from 'react-icons/fa';
import PhoneVerificationModal from '../components/PhoneVerificationModal';
import toast from 'react-hot-toast';

const ProductContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #ffffff;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: color 0.3s ease;

  &:hover {
    color: #888;
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;

const ImageSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const MainImage = styled.img`
  width: 100%;
  max-width: 500px;
  height: auto;
  border-radius: 10px;
  object-fit: cover;
`;

const ImageGallery = styled.div`
  display: flex;
  gap: 10px;
  overflow-x: auto;
`;

const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#ffffff' : 'transparent'};
  transition: border-color 0.3s ease;

  &:hover {
    border-color: #ffffff;
  }
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  margin: 0;
`;

const ProductBrand = styled.p`
  color: #888;
  font-size: 1.2rem;
  margin: 0;
`;

const RatingSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Stars = styled.div`
  display: flex;
  gap: 2px;
  color: #FFD700;
`;

const ReviewCount = styled.span`
  color: #888;
  font-size: 14px;
`;

const PriceSection = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const OriginalPrice = styled.span`
  text-decoration: line-through;
  color: #888;
  font-size: 1.2rem;
`;

const DiscountedPrice = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
`;

const DiscountBadge = styled.span`
  background-color: #ff6b6b;
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: bold;
`;

const Description = styled.p`
  color: #b0b0b0;
  line-height: 1.6;
  font-size: 1rem;
`;

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FeatureItem = styled.li`
  color: #b0b0b0;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 8px;

  &::before {
    content: '✓';
    color: #4CAF50;
    font-weight: bold;
  }
`;

const SizeSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SizeLabel = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 10px 15px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 14px;

  &:hover {
    border-color: #ffffff;
  }

  &.selected {
    background-color: #ffffff;
    color: #000000;
    border-color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantitySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const QuantityLabel = styled.label`
  font-weight: bold;
  font-size: 1.1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const QuantityButton = styled.button`
  width: 40px;
  height: 40px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 18px;

  &:hover {
    border-color: #ffffff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const QuantityDisplay = styled.span`
  font-size: 1.2rem;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const AddToCartButton = styled.button`
  flex: 1;
  padding: 15px;
  background-color: #ffffff;
  color: #000000;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;

  &:hover {
    background-color: #dddddd;
  }

  &:disabled {
    background-color: #666;
    cursor: not-allowed;
  }
`;

const WishlistButton = styled.button`
  padding: 15px;
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #ffffff;
    background-color: #333;
  }
`;

const ShareButton = styled.button`
  padding: 15px;
  background-color: transparent;
  color: #ffffff;
  border: 2px solid #333;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    border-color: #ffffff;
    background-color: #333;
  }
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPhoneModal, setShowPhoneModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const product = getProductById(id);

  if (!product) {
    navigate('/products');
    return null;
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setPendingAction('addToCart');
    setShowPhoneModal(true);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    setPendingAction('buyNow');
    setShowPhoneModal(true);
  };

  const handlePhoneVerificationSuccess = (phoneNumber) => {
    const productWithSize = {
      ...product,
      selectedSize,
      quantity
    };

    if (pendingAction === 'addToCart') {
      addToCart(productWithSize);
      toast.success(`${product.name} added to cart!`);
    } else if (pendingAction === 'buyNow') {
      addToCart(productWithSize);
      navigate('/checkout');
    }
    setPendingAction(null);
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity);
    }
  };

  const handleWishlist = () => {
    toast.success('Added to wishlist!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out this amazing ${product.name}!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const discountPercentage = Math.round(((product.originalPrice - product.discountedPrice) / product.originalPrice) * 100);

  return (
    <ProductContainer>
      <BackButton onClick={() => navigate(-1)}>
        <FaArrowLeft />
        Back to Products
      </BackButton>

      <ProductGrid>
        <ImageSection>
          <MainImage src={product.image} alt={product.name} />
          <ImageGallery>
            {[product.image, product.image, product.image].map((img, index) => (
              <ThumbnailImage
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                active={selectedImage === index}
                onClick={() => setSelectedImage(index)}
              />
            ))}
          </ImageGallery>
        </ImageSection>

        <ProductInfo>
          <div>
            <ProductTitle>{product.name}</ProductTitle>
            <ProductBrand>{product.brand}</ProductBrand>
          </div>

          <RatingSection>
            <Stars>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} color={i < Math.floor(product.rating) ? '#FFD700' : '#333'} />
              ))}
            </Stars>
            <ReviewCount>({product.reviews} reviews)</ReviewCount>
          </RatingSection>

          <PriceSection>
            <OriginalPrice>₹{product.originalPrice.toLocaleString()}</OriginalPrice>
            <DiscountedPrice>₹{product.discountedPrice.toLocaleString()}</DiscountedPrice>
            <DiscountBadge>-{discountPercentage}%</DiscountBadge>
          </PriceSection>

          <Description>{product.description}</Description>

          <FeaturesList>
            {product.features.map((feature, index) => (
              <FeatureItem key={index}>{feature}</FeatureItem>
            ))}
          </FeaturesList>

          <SizeSection>
            <SizeLabel>Select Size:</SizeLabel>
            <SizeOptions>
              {product.sizes.map((size) => (
                <SizeOption
                  key={size}
                  className={selectedSize === size ? 'selected' : ''}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeOption>
              ))}
            </SizeOptions>
          </SizeSection>

          <QuantitySection>
            <QuantityLabel>Quantity:</QuantityLabel>
            <QuantityControls>
              <QuantityButton
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity <= 1}
              >
                -
              </QuantityButton>
              <QuantityDisplay>{quantity}</QuantityDisplay>
              <QuantityButton
                onClick={() => handleQuantityChange(1)}
                disabled={quantity >= 10}
              >
                +
              </QuantityButton>
            </QuantityControls>
          </QuantitySection>

          <ActionButtons>
            <AddToCartButton onClick={handleAddToCart} disabled={!selectedSize}>
              <FaShoppingCart />
              Add to Cart
            </AddToCartButton>
            <WishlistButton onClick={handleWishlist}>
              <FaHeart />
            </WishlistButton>
            <ShareButton onClick={handleShare}>
              <FaShare />
            </ShareButton>
          </ActionButtons>

          <PhoneVerificationModal
            isOpen={showPhoneModal}
            onClose={() => {
              setShowPhoneModal(false);
              setPendingAction(null);
            }}
            onSuccess={handlePhoneVerificationSuccess}
            actionType={pendingAction}
          />
        </ProductInfo>
      </ProductGrid>
    </ProductContainer>
  );
};

export default ProductDetail; 