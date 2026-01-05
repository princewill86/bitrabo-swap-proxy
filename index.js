const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

// Target: OneKey's real swap backend (from your code)
const ONEKEY_SWAP_TARGET = 'https://swap.onekeycn.com';

// Forward /v1/* to OneKey (e.g., /v1/quote → swap.onekeycn.com/v1/quote)
app.use(
  '/v1',
  createProxyMiddleware({
    target: ONEKEY_SWAP_TARGET,
    changeOrigin: true,
    pathRewrite: { '^/v1': '/v1' }, // Keep path same
  })
);

// Health check
app.get('/', (req, res) => res.send('Bitrabo Proxy Ready!'));

app.listen(PORT, () => console.log(`Proxy on port ${PORT}`));