const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const ONEKEY_SWAP_TARGET = 'https://swap.onekeycn.com';

app.use(
  '/v1',
  createProxyMiddleware({
    target: ONEKEY_SWAP_TARGET,
    changeOrigin: true,
    pathRewrite: { '^/v1': '/v1' },  // No change needed, but keeps it clean
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Host', 'swap.onekeycn.com');
      proxyReq.setHeader('Origin', 'https://onekey.so');
      proxyReq.setHeader('Referer', 'https://onekey.so/');
      proxyReq.setHeader('User-Agent', 'OneKey App');
      proxyReq.setHeader('X-OneKey-Platform', 'mobile');  // Mimics official app
    },
  })
);

app.get('/', (req, res) => res.send('Bitrabo Proxy Ready!'));

app.listen(PORT, () => console.log(`Proxy on port ${PORT}`));
