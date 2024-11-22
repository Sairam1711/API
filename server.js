const express = require('express');
const bodyParser = require('body-parser');
const productsRoutes = require('./routes/products-routes');
const app = express();
const PORT = 3000;
const initDb = require("./utils/InitDB");

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', productsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
