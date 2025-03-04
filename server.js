const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Serve static files
app.use(express.static(path.join(__dirname, 'web-build')));

// Set correct MIME types
app.use((req, res, next) => {
  if (req.url.endsWith('.bundle')) {
    res.setHeader('Content-Type', 'application/javascript');
  }
  next();
});

// Proxy to Metro bundler
app.use(
  '/index.bundle',
  createProxyMiddleware({
    target: 'http://localhost:8081',
    changeOrigin: true,
    ws: true,
  })
);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 