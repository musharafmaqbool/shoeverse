import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaEdit, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import PhoneVerificationModal from './PhoneVerificationModal';
import toast from 'react-hot-toast';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const ModalContent = styled.div`
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 30px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: #888;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #ffffff;
  }
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

const ProfileAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 15px;
  font-size: 2rem;
  color: #ffffff;
`;

const ProfileName = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 5px;
  color: #ffffff;
`;

const ProfileEmail = styled.p`
  color: #888;
  font-size: 1rem;
  margin: 0;
`;

const ProfileSection = styled.div`
  margin-bottom: 25px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  margin-bottom: 15px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InfoGrid = styled.div`
  display: grid;
  gap: 15px;
`;

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px;
  background-color: #2a2a2a;
  border-radius: 8px;
`;

const InfoIcon = styled.div`
  color: #888;
  font-size: 16px;
  width: 20px;
`;

const InfoContent = styled.div`
  flex: 1;
`;

const InfoLabel = styled.div`
  font-size: 12px;
  color: #888;
  margin-bottom: 2px;
`;

const InfoValue = styled.div`
  font-size: 14px;
  color: #ffffff;
`;

const AddButton = styled.button`
  background: none;
  border: none;
  color: #4CAF50;
  font-size: 12px;
  cursor: pointer;
  text-decoration: underline;

  &:hover {
    color: #45a049;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;

  &.primary {
    background-color: #ffffff;
    color: #000000;

    &:hover {
      background-color: #dddddd;
    }
  }

  &.secondary {
    background-color: transparent;
    color: #ffffff;
    border: 2px solid #333;

    &:hover {
      border-color: #ffffff;
      background-color: #333;
    }
  }

  &.danger {
    background-color: #ff6b6b;
    color: #ffffff;

    &:hover {
      background-color: #ff5252;
    }
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  margin-bottom: 25px;
`;

const StatCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 8px;
  padding: 15px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 12px;
`;

const UserProfileModal = ({ isOpen, onClose }) => {
  const { currentUser, userProfile, logout } = useAuth();
  const [showPhoneModal, setShowPhoneModal] = useState(false);

  if (!isOpen || !currentUser) return null;

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logged out successfully');
      onClose();
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  const handlePhoneVerificationSuccess = (phoneNumber) => {
    toast.success('Phone number added successfully!');
    // In a real app, you would update the user profile here
  };

  const hasPhoneNumber = userProfile?.phone && userProfile.phone.length > 0;

  return (
    <>
      <ModalOverlay onClick={onClose}>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>

          <ProfileHeader>
            <ProfileAvatar>
              <FaUser />
            </ProfileAvatar>
            <ProfileName>{userProfile?.displayName || currentUser.displayName || 'User'}</ProfileName>
            <ProfileEmail>{currentUser.email}</ProfileEmail>
          </ProfileHeader>

          <StatsGrid>
            <StatCard>
              <StatNumber>{userProfile?.orders?.length || 0}</StatNumber>
              <StatLabel>Orders</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{userProfile?.wishlist?.length || 0}</StatNumber>
              <StatLabel>Wishlist</StatLabel>
            </StatCard>
            <StatCard>
              <StatNumber>{userProfile?.addresses?.length || 0}</StatNumber>
              <StatLabel>Addresses</StatLabel>
            </StatCard>
          </StatsGrid>

          <ProfileSection>
            <SectionTitle>
              <FaUser />
              Personal Information
            </SectionTitle>
            <InfoGrid>
              <InfoItem>
                <InfoIcon>
                  <FaEnvelope />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Email</InfoLabel>
                  <InfoValue>{currentUser.email}</InfoValue>
                </InfoContent>
              </InfoItem>

              <InfoItem>
                <InfoIcon>
                  <FaPhone />
                </InfoIcon>
                <InfoContent>
                  <InfoLabel>Phone Number</InfoLabel>
                  <InfoValue>
                    {hasPhoneNumber ? userProfile.phone : 'Not added'}
                  </InfoValue>
                </InfoContent>
                {!hasPhoneNumber && (
                  <AddButton onClick={() => setShowPhoneModal(true)}>
                    Add Phone
                  </AddButton>
                )}
              </InfoItem>

              {userProfile?.address && (
                <InfoItem>
                  <InfoIcon>
                    <FaMapMarkerAlt />
                  </InfoIcon>
                  <InfoContent>
                    <InfoLabel>Address</InfoLabel>
                    <InfoValue>{userProfile.address}</InfoValue>
                  </InfoContent>
                </InfoItem>
              )}
            </InfoGrid>
          </ProfileSection>

          <ActionButtons>
            <Button className="primary" onClick={() => window.location.href = '/profile'}>
              <FaEdit />
              Edit Profile
            </Button>
            <Button className="secondary" onClick={() => window.location.href = '/orders'}>
              <FaUser />
              My Orders
            </Button>
            <Button className="danger" onClick={handleLogout}>
              <FaSignOutAlt />
              Logout
            </Button>
          </ActionButtons>
        </ModalContent>
      </ModalOverlay>

      <PhoneVerificationModal
        isOpen={showPhoneModal}
        onClose={() => setShowPhoneModal(false)}
        onSuccess={handlePhoneVerificationSuccess}
        actionType="addPhone"
      />
    </>
  );
};

export default UserProfileModal; 