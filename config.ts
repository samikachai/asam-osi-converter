const path = require('path');

module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png)$/i,
      type: "asset/inline",
    });
    config.resolve.alias = {
      '@utils': path.resolve(__dirname, 'common/utils'),
      '@common-types': path.resolve(__dirname, 'common/types')
    };
    return config;
  },
};
