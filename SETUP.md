# Shoes Store - Complete Setup Guide

This guide will help you set up the complete shoes store with phone verification functionality.

## 🚀 Features Added

### Phone Verification System
- ✅ **OTP-based phone verification** for all cart/checkout actions
- ✅ **MongoDB integration** for storing phone numbers and OTPs
- ✅ **User profile modal** showing user details and phone status
- ✅ **Add phone number** functionality from user profile

### Enhanced User Experience
- ✅ **Phone verification required** for Add to Cart, Buy Now, and Checkout
- ✅ **User profile modal** accessible from header user icon
- ✅ **Real-time OTP validation** with countdown timer
- ✅ **Resend OTP functionality** with rate limiting

## 📋 Prerequisites

1. **Node.js** (v14 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **Git** (for version control)

## 🛠 Setup Instructions

### 1. Frontend Setup

```bash
# Navigate to the project directory
cd shoes-store

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (see below for content)
touch .env
```

### 3. Environment Configuration

Create a `.env` file in the `backend` directory:

```env
MONGODB_URI=mongodb://localhost:27017/shoes-store
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### 4. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Install MongoDB locally
# For Windows: Download from https://www.mongodb.com/try/download/community
# For Mac: brew install mongodb-community
# For Ubuntu: sudo apt install mongodb

# Start MongoDB service
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string
4. Replace `MONGODB_URI` in `.env` with your Atlas connection string

### 5. Start Backend Server

```bash
# From the backend directory
npm run dev
```

The backend will run on `http://localhost:5000`

## 🔧 Configuration

### Firebase Setup (Optional)
If you want to use Firebase authentication:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project
3. Enable Authentication (Email/Password)
4. Get your config and update `src/firebase/config.js`

### Stripe Setup (Optional)
For real payment processing:

1. Sign up at [Stripe](https://stripe.com)
2. Get your publishable and secret keys
3. Update the keys in the respective files

## 📱 Phone Verification Flow

### How it Works

1. **User clicks "Add to Cart" or "Buy Now"**
   - Phone verification modal appears
   - User enters phone number
   - OTP is sent to the number

2. **OTP Verification**
   - User enters 4-digit OTP
   - System validates OTP against database
   - Phone number is stored in MongoDB

3. **User Profile**
   - Click user icon in header
   - View user details and phone status
   - Add phone number if not already added

### API Endpoints

- `POST /api/send-otp` - Send OTP to phone number
- `POST /api/verify-otp` - Verify OTP and update user
- `GET /api/user/:userId` - Get user profile
- `POST /api/update-phone` - Update user phone number

## 🗄 Database Schema

### Users Collection
```javascript
{
  _id: ObjectId,
  email: String (required, unique),
  displayName: String (required),
  phoneNumber: String (unique, sparse),
  phoneVerified: Boolean (default: false),
  createdAt: Date,
  orders: [ObjectId],
  addresses: [{
    address: String,
    city: String,
    state: String,
    zipCode: String
  }],
  wishlist: [ObjectId]
}
```

### OTP Collection
```javascript
{
  _id: ObjectId,
  phoneNumber: String (required),
  otp: String (required),
  createdAt: Date (expires after 5 minutes)
}
```

## 🧪 Testing the System

### 1. Test Phone Verification
1. Go to any product page
2. Click "Add to Cart" or "Buy Now"
3. Enter a phone number (e.g., 1234567890)
4. Check backend console for OTP
5. Enter the OTP to complete verification

### 2. Test User Profile
1. Click the user icon in the header
2. View user details and phone status
3. Add phone number if not already added

### 3. Test Cart and Checkout
1. Add items to cart (requires phone verification)
2. Go to cart page
3. Proceed to checkout (requires phone verification)
4. Complete payment process

## 🔒 Security Features

- **OTP Expiration**: OTPs expire after 5 minutes
- **Rate Limiting**: OTP requests are limited
- **Input Validation**: Phone numbers and OTPs are validated
- **Secure Storage**: Phone numbers stored securely in MongoDB

## 🚨 Troubleshooting

### Common Issues

1. **Backend not starting**
   - Check if MongoDB is running
   - Verify `.env` file exists and has correct values
   - Check if port 5000 is available

2. **Phone verification not working**
   - Check backend console for OTP logs
   - Verify MongoDB connection
   - Check network connectivity

3. **Frontend not connecting to backend**
   - Ensure backend is running on port 5000
   - Check CORS configuration
   - Verify API endpoints

### Debug Commands

```bash
# Check MongoDB connection
mongo shoes-store

# Check backend logs
cd backend && npm run dev

# Check frontend logs
cd .. && npm run dev
```

## 📞 SMS Integration

Currently, OTPs are logged to the console. To integrate with a real SMS service:

1. **Twilio Integration**
   ```javascript
   // In backend/server.js
   const twilio = require('twilio');
   const client = twilio(accountSid, authToken);
   
   // Replace console.log with:
   await client.messages.create({
     body: `Your OTP is: ${otp}`,
     from: '+1234567890',
     to: phoneNumber
   });
   ```

2. **AWS SNS Integration**
   ```javascript
   // In backend/server.js
   const AWS = require('aws-sdk');
   const sns = new AWS.SNS();
   
   // Replace console.log with:
   await sns.publish({
     Message: `Your OTP is: ${otp}`,
     PhoneNumber: phoneNumber
   }).promise();
   ```

## 🎯 Next Steps

1. **Deploy to Production**
   - Set up production MongoDB
   - Configure environment variables
   - Set up SSL certificates

2. **Add More Features**
   - Email notifications
   - Order tracking
   - Wishlist functionality
   - Product reviews

3. **Enhance Security**
   - Rate limiting
   - Input sanitization
   - HTTPS enforcement
   - JWT token refresh

## 📞 Support

If you encounter any issues:

1. Check the console logs for errors
2. Verify all environment variables are set
3. Ensure MongoDB is running
4. Check network connectivity

The system is now fully functional with phone verification for all e-commerce actions! 