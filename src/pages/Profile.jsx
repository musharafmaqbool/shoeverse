import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const ProfileContainer = styled.div`
  min-height: calc(100vh - 60px);
  background-color: #000000;
  color: #ffffff;
  padding: 20px;
  font-family: 'Poppins', sans-serif;
`;

const ProfileCard = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background-color: #1a1a1a;
  border-radius: 15px;
  padding: 40px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const ProfileHeader = styled.div`
  text-align: center;
  margin-bottom: 40px;
`;

const ProfileAvatar = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background-color: #333;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 3rem;
  color: #ffffff;
`;

const ProfileName = styled.h1`
  font-size: 2rem;
  margin-bottom: 10px;
`;

const ProfileEmail = styled.p`
  color: #888;
  font-size: 1.1rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  font-size: 14px;
  color: #888;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Input = styled.input`
  padding: 12px;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: #2a2a2a;
  color: #ffffff;
  font-size: 16px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: #ffffff;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

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
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const StatCard = styled.div`
  background-color: #2a2a2a;
  border-radius: 10px;
  padding: 20px;
  text-align: center;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: #ffffff;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  color: #888;
  font-size: 14px;
`;

const Profile = () => {
  const { currentUser, userProfile, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: userProfile?.displayName || '',
    phone: userProfile?.phone || '',
    address: userProfile?.address || '',
    city: userProfile?.city || '',
    state: userProfile?.state || '',
    zipCode: userProfile?.zipCode || ''
  });

  if (!currentUser) {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      await updateUserProfile(formData);
      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  const handleCancel = () => {
    setFormData({
      displayName: userProfile?.displayName || '',
      phone: userProfile?.phone || '',
      address: userProfile?.address || '',
      city: userProfile?.city || '',
      state: userProfile?.state || '',
      zipCode: userProfile?.zipCode || ''
    });
    setIsEditing(false);
  };

  return (
    <ProfileContainer>
      <ProfileCard>
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
            <StatLabel>Total Orders</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userProfile?.wishlist?.length || 0}</StatNumber>
            <StatLabel>Wishlist Items</StatLabel>
          </StatCard>
          <StatCard>
            <StatNumber>{userProfile?.addresses?.length || 0}</StatNumber>
            <StatLabel>Saved Addresses</StatLabel>
          </StatCard>
        </StatsGrid>

        <ProfileSection>
          <SectionTitle>
            <FaUser />
            Personal Information
          </SectionTitle>
          <Form>
            <FormRow>
              <InputGroup>
                <Label>
                  <FaUser />
                  Full Name
                </Label>
                <Input
                  type="text"
                  name="displayName"
                  value={formData.displayName}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </InputGroup>
              <InputGroup>
                <Label>
                  <FaPhone />
                  Phone Number
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </InputGroup>
            </FormRow>

            <InputGroup>
              <Label>
                <FaMapMarkerAlt />
                Address
              </Label>
              <Input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </InputGroup>

            <FormRow>
              <InputGroup>
                <Label>City</Label>
                <Input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </InputGroup>
              <InputGroup>
                <Label>State</Label>
                <Input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </InputGroup>
            </FormRow>

            <InputGroup>
              <Label>ZIP Code</Label>
              <Input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </InputGroup>

            <ButtonGroup>
              {isEditing ? (
                <>
                  <Button type="button" className="primary" onClick={handleSave}>
                    <FaSave />
                    Save Changes
                  </Button>
                  <Button type="button" className="secondary" onClick={handleCancel}>
                    <FaTimes />
                    Cancel
                  </Button>
                </>
              ) : (
                <Button type="button" className="primary" onClick={() => setIsEditing(true)}>
                  <FaEdit />
                  Edit Profile
                </Button>
              )}
            </ButtonGroup>
          </Form>
        </ProfileSection>
      </ProfileCard>
    </ProfileContainer>
  );
};

export default Profile; 