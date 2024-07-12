// server.js
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

app.use(
  "/api",
  createProxyMiddleware({
    target: "https://bible-api.com/?random=verse",
    changeOrigin: true,
    pathRewrite: {
      "^/api": "", // remove /api prefix when requesting
    },
    onProxyReq: (proxyReq, req, res) => {
      proxyReq.setHeader("origin", "https://bible-api.com");
    },
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});
