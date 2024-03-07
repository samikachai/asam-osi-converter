module.exports = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png)$/i,
      type: "asset/inline",
    });
    return config;
  },
};
