const { getDefaultConfig } = require('@expo/metro-config');
const path = require('path');

const defaultConfig = getDefaultConfig(__dirname);

module.exports = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [...defaultConfig.resolver.sourceExts, 'mjs', 'cjs'],
    assetExts: [...defaultConfig.resolver.assetExts, 'bin', 'db', 'sqlite'],
  },
  server: {
    port: 8081,
    enhanceMiddleware: (middleware) => {
      return (req, res, next) => {
        // Ensure correct content type for bundles
        if (req.url.endsWith('.bundle')) {
          res.setHeader('Content-Type', 'application/javascript');
        }
        return middleware(req, res, next);
      };
    },
  },
}; 