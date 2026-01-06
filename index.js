const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/v1', createProxyMiddleware({
  target: 'https://swap.onekeycn.com',
  changeOrigin: true,  // This is key — changes Host header
  pathRewrite: { '^/v1': '/v1' },
  onProxyReq: (proxyReq, req, res) => {
    // Force Host header to OneKey's domain (extra safety)
    proxyReq.setHeader('Host', 'swap.onekeycn.com');
    proxyReq.setHeader('Origin', 'https://onekey.so');
    proxyReq.setHeader('Referer', 'https://onekey.so/');
  },
}));

app.get('/', (req, res) => res.send('Bitrabo Proxy Ready!'));

app.listen(PORT, () => console.log(`Proxy on port ${PORT}`));
