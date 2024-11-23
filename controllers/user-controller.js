const bcrypt = require('bcryptjs');
const User = require('../models/user');
require('dotenv').config(); // To use environment variables

// Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Save user information in session
    req.session.userId = user._id;
    req.session.name = user.name;
    req.session.email = user.email;

    res.status(201).json({ message: 'User registered successfully', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Compare passwords
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: 'Invalid credentials' });

    // Save user information in session
    req.session.userId = user._id;
    req.session.name = user.name;
    req.session.email = user.email;

    res.status(200).json({ message: 'Login successful', userId: user._id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout User
exports.logoutUser = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err.message });
    }
    res.status(200).json({ message: 'Logged out successfully' });
  });
};

exports.getprofile=(req, res) => {
  if (req.session.userId) {
    res.send(`User profile: ${req.session.userId}`);
  } else {
    res.status(401).send('Not logged in');
  }
};