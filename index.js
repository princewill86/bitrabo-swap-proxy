const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

const ONEKEY_SWAP_TARGET = 'https://swap.onekeycn.com';

app.use(
  '/swap/v1',
  createProxyMiddleware({
    target: ONEKEY_SWAP_TARGET,
    changeOrigin: true,
    pathRewrite: { '^/swap/v1': '/v1' },  // Strip /swap so /swap/v1/quote → /v1/quote
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader('Host', 'swap.onekeycn.com');
      proxyReq.setHeader('Origin', 'https://onekey.so');
      proxyReq.setHeader('Referer', 'https://onekey.so/');
      proxyReq.setHeader('User-Agent', 'OneKey App');
    },
  })
);

app.get('/', (req, res) => res.send('Bitrabo Proxy Ready!'));

app.listen(PORT, () => console.log(`Proxy on port ${PORT}`));
