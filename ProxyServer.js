require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');
const { createLoadBalancer, addServerHealthChecks } = require('./loadBalancer');
const connection = require('./DB.js');
const swaggerDoc = require('./swaggerDoc');

const app = express();

app.use(express.json());

// Logging requests
const logStream = fs.createWriteStream('logFile.txt', {
  flags: 'a',
});

app.use((req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.url} - ${req.method}\n`;
  logStream.write(logEntry);
  next();
});

// Database connection
connection();

// Load balancing logic
const servers = [
  { url: 'http://localhost:3001', health: true },
  { url: 'http://localhost:3002', health: true },
  { url: 'http://localhost:3003', health: true },
];

const loadBalancer = createLoadBalancer(servers);
addServerHealthChecks(servers);

// Proxy middleware
app.use((req, res, next) => {
    // Redirect the request through the load balancer function
    const selectedServer = loadBalancer.next();
    req.selectedServer = selectedServer;
    // console.log(selectedServer.value.url)
  
    // Create a new instance of createProxyMiddleware for each request
    const proxy = createProxyMiddleware({ target: selectedServer.value.url, changeOrigin: true });
  
    // Proxy the request to the selected server
    proxy(req, res, next);
  });
  
// Swagger documentation
app.use('/', swaggerDoc);

// Setting the server to listen
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Your server is listening on port ${PORT}`);
});

// // Handle proxy errors
// proxy.on('error', (err, req, res) => {
//   console.error(err);
//   res.status(500).send('Proxy Error');
// });