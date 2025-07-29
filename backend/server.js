const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/shoes-store', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// User Schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  displayName: { type: String, required: true },
  phoneNumber: { type: String, unique: true, sparse: true },
  phoneVerified: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
  addresses: [{
    address: String,
    city: String,
    state: String,
    zipCode: String
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }]
});

const User = mongoose.model('User', userSchema);

// OTP Schema
const otpSchema = new mongoose.Schema({
  phoneNumber: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 } // Expires after 5 minutes
});

const OTP = mongoose.model('OTP', otpSchema);

// Generate OTP
function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

// Send OTP API
app.post('/api/send-otp', async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber || phoneNumber.length < 10) {
      return res.status(400).json({ error: 'Invalid phone number' });
    }

    // Generate OTP
    const otp = generateOTP();

    // Save OTP to database
    await OTP.findOneAndUpdate(
      { phoneNumber },
      { otp, createdAt: new Date() },
      { upsert: true, new: true }
    );

    // In a real application, you would integrate with SMS service here
    // For demo purposes, we'll just log the OTP
    console.log(`OTP for ${phoneNumber}: ${otp}`);

    res.json({ message: 'OTP sent successfully' });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
});

// Verify OTP API
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ error: 'Phone number and OTP are required' });
    }

    // Find OTP in database
    const otpRecord = await OTP.findOne({ phoneNumber, otp });

    if (!otpRecord) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Check if OTP is expired (5 minutes)
    const now = new Date();
    const otpTime = new Date(otpRecord.createdAt);
    const diffInMinutes = (now - otpTime) / (1000 * 60);

    if (diffInMinutes > 5) {
      await OTP.deleteOne({ phoneNumber, otp });
      return res.status(400).json({ error: 'OTP has expired' });
    }

    // Delete the used OTP
    await OTP.deleteOne({ phoneNumber, otp });

    // Update user's phone number if user is authenticated
    const token = req.headers.authorization?.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        await User.findByIdAndUpdate(decoded.userId, {
          phoneNumber,
          phoneVerified: true
        });
      } catch (error) {
        console.error('Error updating user phone:', error);
      }
    }

    res.json({ message: 'Phone number verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
});

// Update user phone number API
app.post('/api/update-phone', async (req, res) => {
  try {
    const { userId, phoneNumber } = req.body;

    await User.findByIdAndUpdate(userId, {
      phoneNumber,
      phoneVerified: true
    });

    res.json({ message: 'Phone number updated successfully' });
  } catch (error) {
    console.error('Error updating phone number:', error);
    res.status(500).json({ error: 'Failed to update phone number' });
  }
});

// Get user profile API
app.get('/api/user/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Create payment intent API (for Stripe integration)
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'inr', items } = req.body;

    // In a real application, you would integrate with Stripe here
    // For demo purposes, we'll return a mock payment intent
    const mockPaymentIntent = {
      id: `pi_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      client_secret: `pi_${Date.now()}_secret_${Math.random().toString(36).substr(2, 9)}`,
      amount,
      currency
    };

    res.json(mockPaymentIntent);
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'Failed to create payment intent' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 