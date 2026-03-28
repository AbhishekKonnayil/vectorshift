const { createProxyMiddleware } = require('http-proxy-middleware');

const proxyTarget = process.env.REACT_APP_API_PROXY_TARGET || 'http://127.0.0.1:8000';

module.exports = function setupProxy(app) {
  app.use(
    '/pipelines',
    createProxyMiddleware({
      target: proxyTarget,
      changeOrigin: true,
    }),
  );
};
