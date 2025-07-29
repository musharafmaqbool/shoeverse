# Shoes Store Backend

This is the backend API for the shoes store with phone verification functionality.

## Features

- Phone number verification with OTP
- MongoDB integration for user data
- JWT authentication
- Payment intent creation (Stripe ready)
- User profile management

## Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/shoes-store
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=5000
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
```

### 3. MongoDB Setup

Make sure MongoDB is running on your system. You can install it locally or use MongoDB Atlas.

### 4. Start the Server

```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

## API Endpoints

### Phone Verification

- `POST /api/send-otp` - Send OTP to phone number
- `POST /api/verify-otp` - Verify OTP and update user phone

### User Management

- `GET /api/user/:userId` - Get user profile
- `POST /api/update-phone` - Update user phone number

### Payment

- `POST /api/create-payment-intent` - Create Stripe payment intent

## Database Schema

### User Collection
```javascript
{
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
  phoneNumber: String (required),
  otp: String (required),
  createdAt: Date (expires after 5 minutes)
}
```

## SMS Integration

Currently, the OTP is logged to the console. To integrate with a real SMS service:

1. Sign up for an SMS service (Twilio, AWS SNS, etc.)
2. Update the `/api/send-otp` endpoint to send actual SMS
3. Replace the console.log with the SMS service API call

## Security Notes

- JWT_SECRET should be a strong, random string in production
- Enable HTTPS in production
- Implement rate limiting for OTP requests
- Add input validation and sanitization
- Use environment variables for all sensitive data 