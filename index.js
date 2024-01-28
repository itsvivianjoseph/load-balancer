// Import necessary modules
const express = require('express');

// Create an Express application
const app = express();

// Define a route for the root URL
app.get('/', (req, res) => {
  res.send('Hello, this is your Node.js server!');
});

// Set the server to listen on port 3000
const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});