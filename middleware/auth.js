const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

const auth = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1]; // Bearer Token
    if (!token) return res.status(403).json({ message: 'No token provided' });

    const decodedData = jwt.verify(token, SECRET_KEY);
    req.userId = decodedData?.id;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
};

module.exports = auth;
