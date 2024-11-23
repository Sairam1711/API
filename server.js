const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = 3000;

const initDb = require("./utils/InitDB");
const userRoutes = require('./routes/user-routes');
const productsRoutes = require('./routes/products-routes');
const cartRoutes = require('./routes/cart-routes');
const orderRoutes = require('./routes/order-routes');



// Middleware
app.use(
  session({
    secret: process.env.JWT_SECRET, // Change this key to a more secure one
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // Your MongoDB connection URL
      collectionName: 'sessions',
    }),
    cookie: { secure: false }, // Set to true in production when using HTTPS
  })
);
app.use(bodyParser.json());

// Routes

app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes); 
app.use('/api/orders', orderRoutes);
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
